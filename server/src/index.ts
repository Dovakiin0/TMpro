import dotenv from "dotenv";
import server from "./server";
import ConnectDatabase from "./config/database";
import { TRACK_TIME } from "./helper/constants";
import { saveNotification, trackDeadlines } from "./feature/tracker";

dotenv.config(); // initialize dotenv

const PORT = process.env.PORT || 3000;

ConnectDatabase();

// Checks for tasks that are nearing deadline every TRACK_TIME i.e. 1 min
setInterval(async () => {
  // gets the tasks that are nearing deadline
  const { oneHourTasks, thirtyMinutesTasks, tenMinutesTasks } =
    await trackDeadlines();

  // Saves the notification to the database
  saveNotification(oneHourTasks, thirtyMinutesTasks, tenMinutesTasks);
}, TRACK_TIME);

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
