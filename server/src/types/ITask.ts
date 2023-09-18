import mongoose from "mongoose";

export enum TaskPriority {
  LOW,
  MEDIUM,
  HIGH,
}

export interface ITask extends mongoose.Document {
  title: string;
  description: string;
  priority: TaskPriority;
  deadline: Date;
  completed: boolean;
  user: mongoose.Types.ObjectId;
  todayDue: boolean;
  OneHourDue: boolean;
  thirtyMDue: boolean;
  tenMDue: boolean;
}
