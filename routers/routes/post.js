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
} = require("../controllers/post");

postRouter.delete("/ownerDelteComment/:postId/:commentId", authentication, deleteCommentOwner );
postRouter.get("/post/:_id",authentication, getPost);
postRouter.get("/allPost", authentication, authorization, geAllPost);
postRouter.put("/updatePost/:_id", authentication, updatePost);
postRouter.post("/newPost/:_id", authentication, newPost);
postRouter.put("/softDelete/:_id", authentication, softDel);

module.exports = postRouter;
