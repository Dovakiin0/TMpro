import mongoose, { Schema } from "mongoose";
import { ITask } from "../types/ITask";

const TaskScheme = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: Schema.Types.Mixed, required: true },
    deadline: { type: Date, required: true },
    completed: { type: Boolean, required: true },
    user: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

const Task = mongoose.model<ITask>("Task", TaskScheme);
export default Task;
