const express = require("express");
const postRouter = express.Router();
const authentication = require("../authentication");
const authorization = require("../authorization");

const {
  newPost,
  softDel,
  updatePost,
  geAllPost,
  getPost,
  deleteCommentOwner,
  getUserPost,
} = require("../controllers/post");
postRouter.get("/posts/:_id", authentication, getUserPost);

postRouter.delete(
  "/ownerDelteComment/:postId/:commentId",
  authentication,
  deleteCommentOwner
);
postRouter.get("/post/:_id", getPost);
postRouter.get("/allPost", geAllPost);
postRouter.put("/updatePost/:_id", authentication, updatePost);
postRouter.post("/newPost/:_id", authentication, newPost);
postRouter.delete("/softDelete/:_id", authentication, softDel);

module.exports = postRouter;
