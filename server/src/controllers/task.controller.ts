import asyncHandler from "express-async-handler";
import type { Request, Response } from "express";
import Task from "../models/Task";

/* 
 @Desc Get all Tasks
 @Route /api/tasks
 @Method GET
 */
const getAllTasks = asyncHandler(async (req: Request, res: Response) => {
  const tasks = await Task.find({}).populate("User");
  res.status(200).json({ count: tasks.length, tasks });
});

export { getAllTasks };
