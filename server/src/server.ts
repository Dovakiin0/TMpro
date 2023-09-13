import express, { Express } from "express";
import http, { Server } from "http";
import InjectRoutes from "./routes/router";
import morgan from "morgan";
import cors from "cors";
import { errorHandler } from "./middlewares/ErrorMiddleware";

const app: Express = express();
const server: Server = http.createServer(app);

// middlewares for the application
app.use(cors());
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms"),
);
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);

// add all routes for the application
InjectRoutes(app);

// exporting default server
export default server;
