import logger from "../logger/index.js";
import { openDb } from "./dbInstance.js";

export async function createUsers() {
  const db = await openDb();
  try {
    await db.exec(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        mobile TEXT,
        age INTEGER
    );`);
    logger.info("Table created successfully or already exists.");
  } catch (error) {
    logger.error("Table created successfully or already exists.");
  } finally {
    await db.close();
  }
}
