import { sendNotification } from "../feature/tracker";
import TaskNotification from "../models/Notification";
import { IRequest } from "../types/IRequest";
import type { Response } from "express";
import { eventEmitter } from "../server";

/* 
 @Desc tracks and send notification to the connected user through SSE
 @Route /notification
 @Method GET
 */
async function trackDeadline(req: IRequest, res: Response) {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // listens to the event whenever a new notification is created on database and sends notification to connected clients
  eventEmitter.on("taskNotification", (notification) => {
    sendNotification(notification, res);
  });

  req.on("close", () => {
    res.end();
  });
}

/* 
 @Desc Get all unread notification of a user
 @Route /notification/all
 @Method GET
 */
async function getAll(req: IRequest, res: Response) {
  const notifications = await TaskNotification.find({
    userId: req.user!._id,
    isRead: false,
  }).populate("task");
  res.status(200).json(notifications);
}

/* 
 @Desc Marks the notification as read
 @Route /notification/:id
 @Method POST
 */
async function markRead(req: IRequest, res: Response) {
  const notification = await TaskNotification.findByIdAndUpdate(req.params.id, {
    isRead: true,
  });
  res.status(200).json({ success: "true" });
}

export { trackDeadline, getAll, markRead };
