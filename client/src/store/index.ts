import { configureStore } from "@reduxjs/toolkit";

// import reducers
import AuthReducer from "./reducer/authSlice";

export const store = configureStore({
  reducer: {
    AuthReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
