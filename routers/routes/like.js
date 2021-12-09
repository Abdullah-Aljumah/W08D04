const express = require("express");
const likeRouter = express.Router();
const authentication = require("../authentication");
const authorization = require("../authorization");

const { newLike, likeCount } = require("../controllers/like");

likeRouter.post("/like/:userId/:postId", newLike);
likeRouter.get("/likes/:id", likeCount);
module.exports = likeRouter;
