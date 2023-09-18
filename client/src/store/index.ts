import { configureStore } from "@reduxjs/toolkit";

// import reducers
import AuthReducer from "./reducer/authSlice";
import TaskReducer from "./reducer/taskSlice";
import NotificationReducer from "./reducer/notificationSlice";

// Initialize global store
export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    task: TaskReducer,
    notification: NotificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
