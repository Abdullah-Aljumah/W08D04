const express = require("express");
const commentRouter = express.Router();
const authentication = require("../authentication");
const authorization = require("../authorization");

const {
  newComment,
  deleteCommet,
  updateComment,
  getComment,
  getPostWithCommentsAndLikes,
} = require("../controllers/comment");

commentRouter.post("/newComment/:userId/:postId", authentication, newComment);
commentRouter.delete("/deletecomment/:_id", authentication, deleteCommet);
commentRouter.put("/updatecomment/:_id", authentication, updateComment);
commentRouter.get("/getComment/:_id",authentication, getComment);
commentRouter.get(
  "/getPostWithCommentsAndLikes/:_id",
  getPostWithCommentsAndLikes
);

module.exports = commentRouter;
