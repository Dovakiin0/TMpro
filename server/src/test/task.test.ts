import app from "../server";
import request from "supertest";
import mongoose from "mongoose";
import Task from "../models/Task";
import { ITask } from "../types/ITask";
import { IUser } from "../types/IUser";
import User from "../models/User";
import { generateJWT } from "../helper/jwt";

const agent = request.agent(app);

describe("Tasks", () => {
  let user: IUser;
  let task: ITask;
  let token: string;
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
  });

  afterAll(async () => {
    await Task.deleteMany();
    await User.deleteMany();

    app.close();
    await mongoose.disconnect();
  });

  it("GET /api/tasks - Should return 200 and list of tasks", async () => {
    const response = await agent
      .get("/api/tasks")
      .set("Cookie", [`access_token=${token}`]);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("count");
  });

  it("GET /api/tasks/:id - Should return 200 and a single task", async () => {
    const response = await agent
      .get(`/api/tasks/${task._id}`)
      .set("Cookie", [`access_token=${token}`]);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("title");
  });

  it("GET /api/tasks/:id - Should return 400 if Id is not valid", async () => {
    const response = await agent
      .get(`/api/tasks/acbc`)
      .set("Cookie", [`access_token=${token}`]);
    expect(response.statusCode).toBe(400);
  });

  it("POST /api/tasks - Should return 201 and create new Task", async () => {
    const response = await agent
      .post("/api/tasks")
      .set("Cookie", [`access_token=${token}`])
      .send({
        title: "New Task",
        description: "New Description",
        priority: "MEDIUM",
        deadline: "2023-09-29T00:00:00.000Z",
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("title");
  });

  it("PUT /api/tasks/:id - Should return 200 and update Task by ID", async () => {
    const response = await agent
      .put(`/api/tasks/${task._id}`)
      .set("Cookie", [`access_token=${token}`])
      .send({
        priority: "MEDIUM",
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("message");
  });

  it("DELETE /api/tasks/:id - Should return 200 and delete a task by ID", async () => {
    const response = await agent
      .delete(`/api/tasks/${task._id}`)
      .set("Cookie", [`access_token=${token}`]);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("message");
  });
});
