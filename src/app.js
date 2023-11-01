import express from "express";
import { PORT } from "./config/default.js";
import logger from "./logger/index.js";
import { createUsers } from "./db/scheme.js";

import userRoutes from "./routes/user.js";
const app = express();

app.use(express.json());
app.use("/api/v1/user", userRoutes);

app.listen(PORT, async (req, res) => {
  try {
    await createUsers();
    logger.info(`SERVER IS RUNNING AT ${PORT}`);
  } catch (error) {
    logger.error("Error creating table:", error);
  }
});
