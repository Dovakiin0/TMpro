import User from "../models/User";
import app from "../server";
import request from "supertest";
import { IUser } from "../types/IUser";
import mongoose from "mongoose";

describe("User", () => {
  let user: IUser;

  beforeAll(async () => {
    user = new User({
      email: "test@test.com",
      password: "newTest123",
      username: "Jest",
      isVerified: true,
    });
    await user.save();
  });

  afterAll(async () => {
    await User.deleteMany();
    app.close();
    await mongoose.disconnect();
  });

  it("GET /api/auth - Should return 200 and list of Users", async () => {
    const response = await request(app).get("/api/auth");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.users)).toBe(true);
  });

  it("POST /api/auth/register - Should return 201 if user is registered", async () => {
    const response = await request(app).post("/api/auth/register").send({
      email: "test1@test.com",
      password: "newTest1234",
      username: "Jest1",
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("success");
  });

  it("POST /api/auth - Should return 200 if Login success", async () => {
    const response = await request(app).post("/api/auth").send({
      email: "test@test.com",
      password: "newTest123",
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("success");
  });

  it("POST /api/auth - Should return 401 if Login Fails", async () => {
    const response = await request(app).post("/api/auth").send({
      email: "test@test.com",
      password: "newTest12345",
    });
    expect(response.status).toBe(401);
  });
});
