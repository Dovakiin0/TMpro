import { useEffect, useState } from "react";
import { ILoginUser, IRegisterUser } from "../types/IUser";
import { client } from "../config/client";
import { useAppDispatch } from "./useReducer";
import { loginSuccess, logout } from "../store/reducer/authSlice";

export default function useAuth() {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState();
  const [errors, setErrors] = useState();
  const dispatch = useAppDispatch();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const response = await client.get("/api/auth/@me");
      if (response.status === 200) {
        dispatch(loginSuccess(response.data));
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const login = async (credentials: ILoginUser) => {
    try {
      setLoading(true);
      const response = await client.post("/api/auth", credentials);
      if (response.status === 200) {
        setData(response.data);
        dispatch(loginSuccess(response.data));
      }
    } catch (err: any) {
      setErrors(err);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: IRegisterUser) => {
    try {
      setLoading(true);
      const response = await client.post("/api/auth/register", {
        email: userData.email,
        username: userData.username,
        password: userData.password,
      });
      if (response.status === 201) {
        setData(response.data);
        dispatch(loginSuccess(response.data));
      }
    } catch (err: any) {
      setErrors(err);
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    try {
      setLoading(true);
      const response = await client.post("/api/auth/logout", {});
      if (response.status === 200) {
        setData(response.data);
        dispatch(logout);
      }
    } catch (err: any) {
      setErrors(err);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, data, errors, register, logoutUser };
}