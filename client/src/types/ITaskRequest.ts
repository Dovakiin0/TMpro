export interface ITaskRequest {
  title: string;
  description: string;
  deadline: Date;
  priority: string;
  completed: boolean;
}

export type ITaskCreateRequest = Omit<ITaskRequest, "completed">;
