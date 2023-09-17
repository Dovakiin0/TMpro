import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ISort, ITask, ITaskResponse } from "../../types/ITask";

const initialState: ITaskResponse = {
  count: 0,
  tasks: [],
  filteredTasks: [],
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
      state.filteredTasks = state.tasks;
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
    sortTasks: (state, action: PayloadAction<ISort>) => {
      const sortType = action.payload;
      let sortedTasks = [...state.tasks];

      switch (sortType) {
        case "CREATED":
          sortedTasks.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
          break;
        case "HIGH":
          // Filter tasks with 'HIGH' priority
          sortedTasks = sortedTasks.filter((task) => task.priority === "HIGH");
          sortedTasks.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
          break;
        case "MEDIUM":
          // Filter tasks with 'MEDIUM' priority
          sortedTasks = sortedTasks.filter(
            (task) => task.priority === "MEDIUM",
          );
          sortedTasks.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
          break;
        case "LOW":
          // Filter tasks with 'LOW' priority
          sortedTasks = sortedTasks.filter((task) => task.priority === "LOW");
          sortedTasks.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
          break;
        case "PAST":
          sortedTasks = sortedTasks.filter(
            (task) => new Date(task.deadline) < new Date(),
          );
          sortedTasks.sort((a, b) => a.deadline.localeCompare(b.deadline));
          break;
        case "TODAY":
          sortedTasks = sortedTasks.filter(
            (task) =>
              new Date(task.deadline).toDateString() ===
              new Date().toDateString(),
          );
          const todayPriorityOrder = ["HIGH", "MEDIUM", "LOW"];
          sortedTasks.sort(
            (a, b) =>
              todayPriorityOrder.indexOf(a.priority) -
              todayPriorityOrder.indexOf(b.priority),
          );
          break;
        case "FUTURE":
          sortedTasks = sortedTasks.filter(
            (task) => new Date(task.deadline) > new Date(),
          );
          sortedTasks.sort((a, b) => a.deadline.localeCompare(b.deadline));
          break;
        default:
          // Default to the original tasks
          sortedTasks = [...state.tasks];
          break;
      }
      // Filter completed tasks and incomplete tasks
      const completedTasks = sortedTasks.filter((task) => task.completed);
      const incompleteTasks = sortedTasks.filter((task) => !task.completed);

      state.filteredTasks = [...incompleteTasks, ...completedTasks];
    },
  },
});

export const { createTask, setTasks, editTask, deleteTask, sortTasks } =
  taskSlice.actions;
export default taskSlice.reducer;
