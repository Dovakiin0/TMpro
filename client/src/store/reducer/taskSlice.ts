import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ISort, ITask, ITaskResponse } from "../../types/ITask";

const initialState: ITaskResponse = {
  count: 0,
  tasks: [], // holds the original tasks provided by server
  filteredTasks: [], // holds the filtered task based on sort
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // Creates new task and append to the state
    createTask: (state, { payload }: PayloadAction<ITask>) => {
      state.tasks = [payload, ...state.tasks];
      state.filteredTasks = state.tasks;
    },

    // Sets all fetched tasks to the state
    setTasks: (state, action: PayloadAction<ITaskResponse>) => {
      // Filter completed tasks and incomplete tasks
      const completedTasks = action.payload.tasks.filter(
        (task) => task.completed,
      );
      const incompleteTasks = action.payload.tasks.filter(
        (task) => !task.completed,
      );

      // push the completed task to the end of task array
      state.tasks = [...incompleteTasks, ...completedTasks];
      state.filteredTasks = state.tasks;
      state.count = action.payload.count;
    },

    // Modifies the existing task and replaces it with original task
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
      state.filteredTasks = state.tasks;
    },

    // removes a task
    deleteTask: (state, action: PayloadAction<string>) => {
      const taskId = action.payload;
      state.tasks = state.tasks.filter((task) => task._id !== taskId);
      state.filteredTasks = state.tasks;
    },

    // Sort and filters the task by certain conditions
    sortTasks: (state, action: PayloadAction<ISort>) => {
      const sortType = action.payload;
      let sortedTasks = [...state.tasks];

      switch (sortType) {
        case "CREATED":
          // sort by created Date
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
        // filter tasks that are before current date
        case "PAST":
          sortedTasks = sortedTasks.filter(
            (task) => new Date(task.deadline) < new Date(),
          );
          sortedTasks.sort((a, b) => a.deadline.localeCompare(b.deadline));
          break;
        // filters tasks that have current date
        case "TODAY":
          sortedTasks = sortedTasks.filter(
            (task) =>
              new Date(task.deadline).toDateString() ===
              new Date().toDateString(),
          );
          // sorts todays tasks by priority
          const todayPriorityOrder = ["HIGH", "MEDIUM", "LOW"];
          sortedTasks.sort(
            (a, b) =>
              todayPriorityOrder.indexOf(a.priority) -
              todayPriorityOrder.indexOf(b.priority),
          );
          break;
        // filters task that are to be completed in future
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
