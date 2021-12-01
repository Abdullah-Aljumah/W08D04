const express = require("express");
const likeRouter = express.Router();
const authentication = require("../authentication");
const authorization = require("../authorization");

const { newLike } = require("../controllers/like");

likeRouter.post("/like/:userId/:postId", newLike);

module.exports = likeRouter;