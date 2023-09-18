import mongoose from "mongoose";
import { ITask } from "../types/ITask";

const TaskScheme = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: String, enum: ["HIGH", "MEDIUM", "LOW"], required: true },
    deadline: { type: Date, required: true },
    completed: { type: Boolean, required: true },
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    OneHourDue: { type: Boolean, default: false },
    thirtyMDue: { type: Boolean, default: false },
    tenMDue: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Task = mongoose.model<ITask>("Task", TaskScheme);
export default Task;
