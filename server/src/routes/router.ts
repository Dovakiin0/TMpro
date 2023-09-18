import type { Application } from "express";

// Import All Routes
import UserRoute from "./user.routes";
import TaskRoute from "./task.routes";
import NotificationRoute from "./notification.routes";

// Middlewares
import { isAuth } from "../middlewares/auth";

export default function InjectRoutes(app: Application) {
  app.use("/api/auth", UserRoute);
  //
  // protected route can only access by authentication
  app.use("/api/tasks", isAuth, TaskRoute);
  app.use("/notification", isAuth, NotificationRoute);
}
