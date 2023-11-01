import { openDb } from "../db/dbInstance.js";
import logger from "../logger/index.js";

export const createUser = async (req, res) => {
  let db = await openDb();
  try {
    const { name, email, mobile, age } = req.body;
    const insertQuery = `INSERT INTO users ( name, email, mobile, age) VALUES (?, ?, ?, ?)`;
    await db.run(insertQuery, [name, email, mobile, age]);

    logger.info("User Created Successfully!!!");
    res.status(200).send({ message: "User Created Succefullyy!!!" });
  } catch (error) {
    logger.error("This is error While creating User", error);
  } finally {
    db.close();
  }
};

export const updateUser = async (req, res) => {
  let db = await openDb();
  try {
    const { id } = req.params;
    const { name, email, mobile, age } = req.body;
    const updateQuery = `UPDATE users SET name = ?, email = ? , mobile = ? , age = ?
      WHERE id = ?; `;
    await db.run(updateQuery, [name, email, mobile, age, id]);
    res
      .status(200)
      .send({ message: "Updated User Details Successfullyyy !!!!" });
  } catch (err) {
    logger.error("This is error While Deleting User", err);
  } finally {
    db.close();
  }
};

export const fetchAllUsers = async (req, res) => {
  let db = await openDb();
  try {
    const selectQuery = `select * from users;`;
    const users = await db.all(selectQuery);
    res
      .status(200)
      .send({ data: users, message: "Users Fetched succefully!!" });
  } catch (error) {
    logger.error("This is error While Fetching all Users", error);
  } finally {
    db.close();
  }
};

export const deleteUser = async (req, res) => {
  let db = await openDb();
  try {
    const { id } = req.params;
    const deleteQuery = `DELETE FROM users WHERE id = ${id}`;
    db.run(deleteQuery);
    logger.info(`Deleting User is success with id ${JSON.stringify(id)}`);
    res.status(200).send({
      message: "Deleting User is success with id " + id,
    });
  } catch (err) {
    logger.error("This is error While Deleting User", err);
  } finally {
    db.close();
  }
};
