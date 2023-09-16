import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITask } from "../../types/ITask";

const initialState: { tasks: ITask[] } = {
  tasks: [],
};

const authSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
});

export default authSlice.reducer;
