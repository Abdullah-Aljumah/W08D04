const express = require("express");
const postRouter = express.Router();
const authentication = require("../authentication");
const authorization = require("../authorization");

const {
  newPost,
  softDel,
  updatePost,
  getPost,
} = require("../controllers/post");

postRouter.get("/allPost", getPost);
postRouter.put("/updatePost/:_id", updatePost);
postRouter.post("/newPost/:_id", newPost);
postRouter.put("/softPost/:_id", softDel);

module.exports = postRouter;
