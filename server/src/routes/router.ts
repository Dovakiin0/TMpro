import type { Application } from "express";

// Import All Routes
import UserRoute from "./user.routes";
import TaskRoute from "./task.routes";

export default function InjectRoutes(app: Application) {
  app.use("/api/auth", UserRoute);
  app.use("/api/tasks", TaskRoute);
}
