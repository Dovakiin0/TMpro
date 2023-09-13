import dotenv from "dotenv";
import server from "./server";
import ConnectDatabase from "./config/database";

dotenv.config(); // initialize dotenv

const PORT = process.env.PORT || 3000;

ConnectDatabase();
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
