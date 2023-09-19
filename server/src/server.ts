import express, { Express } from "express";
import http, { Server } from "http";
import InjectRoutes from "./routes/router";
import morgan from "morgan";
import cors from "cors";
import { errorHandler } from "./middlewares/ErrorMiddleware";
import cookieParser from "cookie-parser";
import EventEmitter from "events";

const app: Express = express();
const server: Server = http.createServer(app);

const allowedOrigins = ["http://localhost:3000", "https://tmpro.ryuo.tech"];

export const eventEmitter = new EventEmitter();

// middlewares for the application
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // Allow the request
      } else {
        callback(new Error("Not allowed by CORS")); // Block the request
      }
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms"),
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// add all routes for the application
InjectRoutes(app);
// add Custom Error Handler middleware
app.use(errorHandler);

// exporting default server
export default server;
