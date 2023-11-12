import express from "express";
import {
  createTodo,
  deleteTodo,
  fetchAllTodos,
  updateTodo,
} from "../controller/todoController.js";

const router = express.Router();

router.get("/all", fetchAllTodos);

router.post("", createTodo);

router.put("/:id", updateTodo);

router.delete("/:id", deleteTodo);

export default router;
