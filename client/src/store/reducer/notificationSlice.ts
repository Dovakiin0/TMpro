import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { INotification } from "../../types/INotification";
import { notifications } from "@mantine/notifications";

interface NotificationState {
  count: number;
  notifications: INotification[];
}

const initialState: NotificationState = {
  count: 0,
  notifications: [],
};

const notificationSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    newNotification: (state, { payload }: PayloadAction<INotification>) => {
      state.notifications = [payload, ...state.notifications];
      state.count += 1;
    },
    setNotification: (state, { payload }: PayloadAction<INotification[]>) => {
      state.notifications = payload;
      state.count = state.notifications.filter(
        (notification) => !notification.isRead,
      ).length;
    },
    markAsRead: (state, { payload }: PayloadAction<string>) => {
      const notificationId = payload;
      state.notifications = state.notifications.filter(
        (notification) => notification._id !== notificationId,
      );
      state.count -= 1;
      if (state.count < 0) {
        state.count = 0;
      }
    },
  },
});

export const { markAsRead, setNotification, newNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
