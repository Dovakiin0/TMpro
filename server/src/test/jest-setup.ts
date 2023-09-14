import dotenv from "dotenv";
import ConnectDatabase from "../config/database";

dotenv.config({ path: ".env.test" });

console.log(process.env.MONGO_URI);

ConnectDatabase();
