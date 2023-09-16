import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITask, ITaskResponse } from "../../types/ITask";

const initialState: ITaskResponse = {
  count: 0,
  tasks: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    createTask: (state, { payload }: PayloadAction<ITask>) => {
      state.tasks = [payload, ...state.tasks];
    },
    setTasks: (state, action: PayloadAction<ITaskResponse>) => {
      // Filter completed tasks and incomplete tasks
      const completedTasks = action.payload.tasks.filter(
        (task) => task.completed,
      );
      const incompleteTasks = action.payload.tasks.filter(
        (task) => !task.completed,
      );

      // Arrange completed tasks at the end by concatenating them with incomplete tasks
      state.tasks = [...incompleteTasks, ...completedTasks];
      state.count = action.payload.count;
    },
    editTask: (state, action: PayloadAction<ITask>) => {
      const editedTask = action.payload;
      const index = state.tasks.findIndex(
        (task) => task._id === editedTask._id,
      );
      if (index !== -1) {
        state.tasks[index] = editedTask;
        if (state.tasks[index].completed) {
          let completedTask = state.tasks.splice(index, 1);
          state.tasks.push(completedTask[0]);
        }
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      const taskId = action.payload;
      state.tasks = state.tasks.filter((task) => task._id !== taskId);
    },
  },
});

export const { createTask, setTasks, editTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
