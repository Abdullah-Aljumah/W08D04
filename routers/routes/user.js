const express = require("express");
const userRouter = express.Router();
const authentication = require("../authentication");
const authorization = require("../authorization");

const { resgister, getUsers, login, softDel } = require("../controllers/user");

userRouter.post("/resgister", resgister);
userRouter.get("/users", authentication, authorization, getUsers);
userRouter.post("/login", login);
userRouter.put("/delete/:_id", authentication, authorization, softDel);

module.exports = userRouter;

// 61a734cd947e8eba47efbc68
