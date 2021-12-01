const express = require("express");
const commentRouter = express.Router();
const authentication = require("../authentication");
const authorization = require("../authorization");

const {
  newComment,
  deleteCommet,
  updateComment,
  getComment,
} = require("../controllers/comment");

commentRouter.post("/newComment/:userId/:postId", newComment);
commentRouter.delete("/deletecomment/:_id", authentication, deleteCommet);
commentRouter.put("/updatecomment/:_id", authentication, updateComment);
commentRouter.get("/getComment/:_id", getComment);

module.exports = commentRouter;
