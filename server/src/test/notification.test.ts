import User from "../models/User";
import mongoose from "mongoose";
import { generateJWT } from "../helper/jwt";
import app from "../server";
import supertest from "supertest";
import { IUser } from "../types/IUser";
import { INotification } from "../types/INotification";
import { ITask } from "../types/ITask";
import Task from "../models/Task";
import Notification from "../models/Notification";

const agent = supertest.agent(app);

describe("Notification", () => {
  let user: IUser;
  let token: string;
  let notification: INotification;
  let task: ITask;
  beforeAll(async () => {
    // Create a mock User
    user = new User({
      email: "jest@test.com",
      password: "jestPwd123",
      username: "Jest",
    });
    token = generateJWT(user._id);
    await user.save();

    // create a mock Task
    task = new Task({
      title: "Jest Mock Task",
      description: "This is description for task",
      priority: "HIGH",
      deadline: "2023-09-25",
      completed: false,
      user: user,
    });
    await task.save();

    notification = new Notification({
      isRead: false,
      message: "Dui in 1 hour",
      task: task,
      userId: user._id,
    });
  });

  afterAll(async () => {
    await User.deleteMany();
    app.close();
    await mongoose.disconnect();
  });

  it("GET /notification/all - Should fetch all Notification of a existing user", async () => {
    const response = await agent
      .get("/notification/all")
      .set("Cookie", [`access_token=${token}`]);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("Should mark notification as read", async () => {
    const response = await agent
      .post(`/notification/${notification._id}`)
      .set("Cookie", [`access_token=${token}`]);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("success");
  });
});
