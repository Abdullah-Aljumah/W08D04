const express = require("express");
const commentRouter = express.Router();
const authentication = require("../authentication");
const authorization = require("../authorization");

const { newComment } = require("../controllers/comment");
commentRouter.post("/newComment/:userId/:postId", newComment);

module.exports = commentRouter;
