const express = require("express");
const userRouter = express.Router();
const authentication = require("../authentication");
const authorization = require("../authorization");

const {
  resgister,
  getUsers,
  login,
  softDel,
  getUser,
  activatetUser
} = require("../controllers/user");

userRouter.get("/user/:_id", getUser);
userRouter.put("/activate/:_id", activatetUser);

userRouter.post("/resgister", resgister);
userRouter.get("/users", getUsers);
userRouter.post("/login", login);
userRouter.put("/delete/:_id", authentication, authorization, softDel);

module.exports = userRouter;

// 61a734cd947e8eba47efbc68
