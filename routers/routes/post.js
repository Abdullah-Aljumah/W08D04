const express = require("express");
const postRouter = express.Router();
const authentication = require("../authentication");
const authorization = require("../authorization");

const { newPost, softDel } = require("../controllers/post");

postRouter.post("/newPost/:_id", newPost);
postRouter.put("/softPost/:_id", softDel);

module.exports = postRouter;
