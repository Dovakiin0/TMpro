import dotenv from "dotenv";
import ConnectDatabase from "../config/database";

dotenv.config({ path: ".env.test" });

ConnectDatabase();
