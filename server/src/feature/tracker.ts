import TaskNotification from "../models/Notification";
import Task from "../models/Task";
import { eventEmitter } from "../server";
import { ITask } from "../types/ITask";
import { Response } from "express";
import { INotification } from "../types/INotification";
import { sendEmail } from "../helper/mailer";
import User from "../models/User";

// Utility function to track what deadlines are coming
export async function trackDeadlines() {
  try {
    const currentDate = new Date();

    // Calculate the deadline times for different intervals
    const oneHourFromNow = new Date(currentDate.getTime() + 60 * 60 * 1000);
    const thirtyMinutesFromNow = new Date(
      currentDate.getTime() + 30 * 60 * 1000,
    );
    const tenMinutesFromNow = new Date(currentDate.getTime() + 10 * 60 * 1000);

    const tasks = await Task.find({
      deadline: {
        $gte: currentDate, // Deadline is later than or equal to now
      },
      completed: false,
    })
      .select("title deadline OneHourDue thirtyMDue tenMDue")
      .populate("user", "_id email username"); // populate user

    // Filter tasks into different intervals based on their deadlines
    const oneHourTasks = tasks.filter((task) => {
      return (
        task.deadline <= oneHourFromNow &&
        task.deadline > thirtyMinutesFromNow && // Exclude tasks that fall into the 30-minute interval
        !task.OneHourDue
      );
    });

    const thirtyMinutesTasks = tasks.filter((task) => {
      return (
        task.deadline <= thirtyMinutesFromNow &&
        task.deadline > tenMinutesFromNow && // Exclude tasks that fall into the 10-minute interval
        !task.thirtyMDue
      );
    });

    const tenMinutesTasks = tasks.filter((task) => {
      return task.deadline <= tenMinutesFromNow && !task.tenMDue;
    });

    return { tenMinutesTasks, thirtyMinutesTasks, oneHourTasks };
  } catch (error) {
    console.log("Error tracking: ", error);
    return {
      tenMinutesTasks: [],
      thirtyMinutesTasks: [],
      oneHourTasks: [],
    };
  }
}

// utility function to send message to response
export function sendNotification(notification: INotification, res: Response) {
  res.write(`data: ${JSON.stringify(notification)}\n\n`);
}

// function to save notification and update the task database
export async function saveNotification(
  oneHourTasks: ITask[],
  thirtyMinutesTasks: ITask[],
  tenMinutesTasks: ITask[],
) {
  for (const task of oneHourTasks) {
    let message = "Due in 1 hour";
    task.OneHourDue = true;
    await task.save();
    saveNotificationToDb(task, message);
  }

  for (const task of thirtyMinutesTasks) {
    let message = "Due in 30 minutes";
    task.thirtyMDue = true;
    await task.save();
    saveNotificationToDb(task, message);
  }

  for (const task of tenMinutesTasks) {
    let message = "Due in 10 minutes";
    task.tenMDue = true;
    await task.save();
    saveNotificationToDb(task, message);
  }
}

// utility function to save the notification to database and emits an event to the server
async function saveNotificationToDb(task: ITask, message: string) {
  const notification = new TaskNotification({
    task,
    message,
    userId: task.user._id,
  });
  await notification.save();

  // send email to the user
  const user = await User.findById(task.user._id);
  if (user) {
    sendEmail({
      to: user.email,
      subject: "Reminder: Nearing deadline",
      context: {
        username: user.username,
        message: `Your Task ${task.title} is ${message}`,
      },
      template: "reminder",
    });
  }

  // emits event when the notification is created
  eventEmitter.emit("taskNotification", notification);
}
