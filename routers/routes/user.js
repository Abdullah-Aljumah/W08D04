const express = require("express");
const userRouter = express.Router();
const authentication = require("../authentication");

const authorization = require("../authorization");

const { resgister, getUsers, login, softDel } = require("../controllers/user");

userRouter.post("/resgister", resgister);
userRouter.get("/users",authentication,authorization, getUsers);
userRouter.post("/login", login);
userRouter.put("/delete/:_id", softDel);

module.exports = userRouter;
