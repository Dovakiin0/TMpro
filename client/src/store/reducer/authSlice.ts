import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser, IUserResponse } from "../../types/IUser";

interface UserState {
  current: IUser | null;
  authenticated: boolean;
}

const initialState: UserState = {
  current: null,
  authenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, { payload }: PayloadAction<IUserResponse>) => {
      state.current = payload;
      state.authenticated = true;
    },
    logout: (state) => {
      state.authenticated = false;
      state.current = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
