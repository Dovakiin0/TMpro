export interface ITask {
  _id: string;
  title: string;
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  deadline: string;
  completed: boolean;
  user: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITaskResponse {
  count: number;
  tasks: ITask[];
  filteredTasks: ITask[];
}

export type ISort =
  | "CREATED"
  | "HIGH"
  | "MEDIUM"
  | "LOW"
  | "PAST"
  | "TODAY"
  | "FUTURE";
