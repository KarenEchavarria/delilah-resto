const express = require("express");
const userRouter = express.Router();
const {
  getAllUsers,
  getUser,
  modifyUser,
  deleteUser,
} = require("./user.controller");
const registerNewUser = require("../../util/register");

userRouter.get("/", getAllUsers);
userRouter.post("/", registerNewUser);

userRouter.get("/:user_id", getUser);
userRouter.put("/:user_id", modifyUser);
userRouter.delete("/:user_id", deleteUser);

module.exports = userRouter;
