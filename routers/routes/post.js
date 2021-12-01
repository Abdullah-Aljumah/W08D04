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
postRouter.get("/allPost", geAllPost);
postRouter.put("/updatePost/:_id", authentication, updatePost);
postRouter.post("/newPost/:_id", authentication, newPost);
postRouter.put("/softPost/:_id", softDel);

module.exports = postRouter;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiNjFhNzM0ZDI5NDdlOGViYTQ3ZWZiYzZhIiwiaWF0IjoxNjM4MzY0ODU1fQ.WR9dhUendIjK_lv4WuBftu0qqqWPrFCv9NTT3WDTZs0
