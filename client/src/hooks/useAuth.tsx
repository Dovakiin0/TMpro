import { useEffect, useState } from "react";
import { ILoginUser, IRegisterUser } from "../types/IUser";
import { client } from "../config/client";
import { useAppDispatch, useAppSelector } from "./useReducer";
import { loginSuccess, logout } from "../store/reducer/authSlice";
import useToast from "./useToast";

export default function useAuth() {
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState();
  const { current, authenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { Error, Success } = useToast();

  useEffect(() => {
    checkUser();
  }, []);

  // Check if current user exists and is valid
  const checkUser = async () => {
    try {
      const response = await client.get("/api/auth/@me");
      if (response.status === 200) {
        dispatch(loginSuccess(response.data));
      }
    } catch (err: any) {
      return;
    }
  };

  const login = async (credentials: ILoginUser) => {
    try {
      setLoading(true);
      const response = await client.post("/api/auth", credentials);
      if (response.status === 200) {
        dispatch(loginSuccess(response.data.user));
      }
    } catch (err: any) {
      setErrors(err);
      Error({ message: err.response.data.message });
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: IRegisterUser, cb?: () => void) => {
    try {
      setLoading(true);
      const response = await client.post("/api/auth/register", {
        email: userData.email,
        username: userData.username,
        password: userData.password,
      });
      if (response.status === 201) {
        await generateOTP(response.data.user.email);
        cb?.();
      }
    } catch (err: any) {
      setErrors(err);
      Error({ message: err.response.data.message });
    } finally {
      setLoading(false);
    }
  };

  const generateOTP = async (email: string) => {
    try {
      const response = await client.post("/api/auth/otp", { email });
      if (response.status === 200) {
        Success({
          message: response.data.message,
        });
      }
    } catch (err: any) {
      Error({ message: err.response.data.message });
    }
  };

  const verifyOTP = async (email: string, otp: number, cb: () => void) => {
    try {
      setLoading(true);
      const response = await client.post("/api/auth/otp/verify", {
        email,
        otp,
      });
      if (response.status === 200) {
        Success({
          message: response.data.message,
        });
        cb();
      }
    } catch (err: any) {
      Error({ message: err.response.data.message });
    }
  };

  const logoutUser = async () => {
    try {
      setLoading(true);
      const response = await client.post("/api/auth/logout", {});
      if (response.status === 200) {
        dispatch(logout);
        window.location.reload();
      }
    } catch (err: any) {
      setErrors(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
    errors,
    register,
    logoutUser,
    current,
    authenticated,
    verifyOTP,
    generateOTP,
  };
}
