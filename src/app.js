import express from "express";
import { PORT } from "./config/default.js";
import logger from "./logger/index.js";

import todoRoutes from "./routes/todo.js";
const app = express();

app.use(express.json());

app.use("/api/v1/todo", todoRoutes);

app.use((req, res) => {
  res.status(404).send({ message: "Not Found" });
});

app.listen(PORT, async (req, res) => {
  logger.info(`SERVER IS RUNNING AT ${PORT}`);
});
