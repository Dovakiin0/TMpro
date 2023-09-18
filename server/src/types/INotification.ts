import mongoose from "mongoose";

export interface INotification extends mongoose.Document {
  isRead: boolean;
  message: string;
  task: mongoose.Types.ObjectId;
  userId: string;
}
