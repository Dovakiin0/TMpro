import { ITask } from "./ITask";

export interface INotification {
  _id: string;
  message: string;
  task: ITask;
  userId: string;
  isRead: boolean;
}
