import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  current: null;
}

const initialState: UserState = {
  current: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export default authSlice.reducer;
