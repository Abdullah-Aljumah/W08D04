const express = require("express");
const commentRouter = express.Router();
const authentication = require("../authentication");
const authorization = require("../authorization");

const { newComment, deleteCommet } = require("../controllers/comment");
commentRouter.post("/newComment/:userId/:postId", newComment);
commentRouter.delete("/deletecomment/:_id", deleteCommet);
module.exports = commentRouter;
