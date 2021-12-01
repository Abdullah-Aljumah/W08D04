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
} = require("../controllers/post");

postRouter.get("/post/:_id", getPost);
postRouter.get("/allPost", authentication, authorization, geAllPost);
postRouter.put("/updatePost/:_id", authentication, updatePost);
postRouter.post("/newPost/:_id", authentication, newPost);
postRouter.put("/softDelete/:_id",authentication, softDel);

module.exports = postRouter;
