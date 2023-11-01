import express from "express";
import {
  createUser,
  deleteUser,
  fetchAllUsers,
  updateUser,
} from "../controller/userController.js";

const router = express.Router();

router.get("/all", fetchAllUsers);

router.get("/:id", (req, res) => {
  res.send({ msg: `User details ${req.params.id}` });
});

router.post("", createUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;
