import express, { Express } from "express";
import dotenv from "dotenv";
import http from "http";
import InjectRoutes from "@/routes/router";
import cors from "cors";
dotenv.config(); // initialize dotenv

const app: Express = express();
const server = http.createServer(app);

// middlewares for the application
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// add all routes for the application
InjectRoutes(app);

// exporting default server
export default server;
