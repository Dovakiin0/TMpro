import type { Application } from "express";

// Import All Routes
import UserRoute from "./user.routes";
import TaskRoute from "./task.routes";
import { isAuth } from "../middlewares/auth";

export default function InjectRoutes(app: Application) {
  app.use("/api/auth", UserRoute);
  app.use("/api/tasks", isAuth, TaskRoute); // protected route can only access by authentication
}
