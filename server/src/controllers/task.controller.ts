import asyncHandler from "express-async-handler";
import type { Response } from "express";
import Task from "../models/Task";
import { IRequest } from "../types/IRequest";
import mongoose from "mongoose";

/* 
 @Desc Get all Tasks
 @Route /api/tasks
 @Method GET
 */
const getAllTasks = asyncHandler(async (req: IRequest, res: Response) => {
  const tasks = await Task.find({ user: req.user }).sort({ createdAt: -1 });
  res.status(200).json({ count: tasks.length, tasks });
});

/* 
 @Desc Get Task by Id
 @Route /api/tasks/:id
 @Method GET
 */
const getTaskById = asyncHandler(async (req: IRequest, res: Response) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error("invalid Id");
  }

  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error("Task Not Found");
  }
  res.status(200).json(task);
});

/* 
 @Desc create New Task
 @Route /api/tasks
 @Method POST
 */
const createTask = asyncHandler(async (req: IRequest, res: Response) => {
  const { title, description, priority, deadline } = req.body;

  const task = new Task({
    title,
    description,
    priority,
    deadline,
    completed: false,
    user: req.user,
  });

  await task.save();

  res.status(201).json({ success: true, task });
});

/* 
 @Desc Updates Existing task by Id
 @Route /api/tasks/:id
 @Method PUT
 */
const updateTask = asyncHandler(async (req: IRequest, res: Response) => {
  const taskBody = req.body;
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error("invalid Id");
  }

  const task = await Task.findByIdAndUpdate(
    req.params.id,
    {
      ...taskBody,
    },
    { new: true },
  );

  if (!task) {
    res.status(400);
    throw new Error("Task Not found");
  }

  await task.save();

  res.status(200).json({ success: true, task });
});

/* 
 @Desc Deletes a task by Id
 @Route /api/tasks/:id
 @Method DELETE
 */
const deleteTask = asyncHandler(async (req: IRequest, res: Response) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error("invalid Id");
  }
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) {
    res.status(400);
    throw new Error("Task Not found");
  }

  res.status(200).json({ success: true });
});

export { getAllTasks, getTaskById, createTask, updateTask, deleteTask };
