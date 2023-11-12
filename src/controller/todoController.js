import { openDb } from "../db/dbInstance.js";
import logger from "../logger/index.js";

export const fetchAllTodos = async (req, res) => {
  let db = await openDb();
  try {
    const selectQuery = `select * from todos;`;
    const todos = await db.all(selectQuery);
    res
      .status(200)
      .send({ data: todos, message: "Todos Fetched succefully!!" });
  } catch (error) {
    logger.error("This is error While Fetching all Todos", error);
    res.status(500).send({ status: 500, message: "Internal Server Error" });
  } finally {
    db.close();
  }
};

export const createTodo = async (req, res) => {
  let db = await openDb();
  try {
    const { name, email, age } = req.body;
    const query = `INSERT INTO todos (name , email, age) VALUES("${name}","${email}",${age})`;
    await db.run(query);
    res.status(200).send({ message: "Todo Created succefully!!" });
  } catch (err) {
    logger.error("This is Error While Creating Todos", err);
    res.status(500).send({ status: 500, message: "Internal Server Error" });
  } finally {
    db.close();
  }
};

export const updateTodo = async (req, res) => {
  let db = await openDb();
  try {
    const { id } = req.params;
    const { name, email, age } = req.body;
    const query = `UPDATE todos SET name="${name}",email="${email}",age=${age} 
                    WHERE id = ${id};`;

    await db.run(query);
    res.status(200).send({ message: "Todo Upated succefully!!" });
  } catch (err) {
    logger.error("This is Error While Updated Todos", err);
    res.status(500).send({ status: 500, message: "Internal Server Error" });
  } finally {
    db.close();
  }
};

export const deleteTodo = async (req, res) => {
  let db = await openDb();
  logger.warn("This is delete Todod API");
  try {
    const { id } = req.params;
    const todoExistCheckQuery = `SELECT name FROM todos WHERE id = ${id}; `;
    const todoExistCheckQueryRes = await db.get(todoExistCheckQuery);
    if (!todoExistCheckQueryRes) {
      return res
        .status(404)
        .send({ status: 404, message: `No Item Found With id ${id}` });
    }
    const query = `DELETE FROM todos WHERE id=${id};`;
    await db.run(query);
    res.status(200).send({ message: "Todo Deleted succefully!!" });
  } catch (err) {
    logger.error("This is Error While Delete Todo", err);
    res.status(500).send({ status: 500, message: "Internal Server Error" });
  } finally {
    db.close();
  }
};
