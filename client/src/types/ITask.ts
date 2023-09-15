export interface ITask {
  _id: string;
  title: string;
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  deadline: string;
  completed: boolean;
  user: string;
}
