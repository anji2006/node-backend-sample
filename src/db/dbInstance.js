import { open } from "sqlite";
import sqlite3 from "sqlite3";

export async function openDb() {
  return open({
    filename: "./dbInstance",
    driver: sqlite3.Database,
  });
}
