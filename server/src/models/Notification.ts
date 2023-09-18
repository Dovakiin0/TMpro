import mongoose from "mongoose";
import { INotification } from "../types/INotification";

const NotificationScheme = new mongoose.Schema(
  {
    isRead: { type: Boolean, default: false },
    message: { type: String, required: true },
    task: { type: mongoose.Types.ObjectId, ref: "Task", required: true },
    userId: { type: String, required: true },
  },
  { timestamps: true },
);

const TaskNotification = mongoose.model<INotification>(
  "TaskNotification",
  NotificationScheme,
);
export default TaskNotification;
