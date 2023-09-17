import express, { Express } from "express";
import http, { Server } from "http";
import InjectRoutes from "./routes/router";
import morgan from "morgan";
import cors from "cors";
import { errorHandler } from "./middlewares/ErrorMiddleware";
import cookieParser from "cookie-parser";

const app: Express = express();
const server: Server = http.createServer(app);

// middlewares for the application
app.use(
  cors({
    origin: ["http://localhost:5173", "https://tmpro.ryuo.tech"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms"),
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// add all routes for the application
InjectRoutes(app);
// add Custom Error Handler middleware
app.use(errorHandler);

// exporting default server
export default server;
