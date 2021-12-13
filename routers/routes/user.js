const express = require("express");
const userRouter = express.Router();
const authentication = require("../authentication");
const authorization = require("../authorization");
const popuptools = require("popup-tools");
require("./../passport");
const passport = require("passport");

const {
  resgister,
  getUsers,
  login,
  softDel,
  getUser,
  activatetUser,
  resetPass,
  getUserByEmail,
  sendCodeResetPass,
} = require("../controllers/user");

userRouter.get("/userEmail/:email", getUserByEmail);
userRouter.post("/resetEmailCode/:email", sendCodeResetPass);

userRouter.get("/user/:_id", getUser);
userRouter.put("/activate/:_id", activatetUser);
userRouter.put("/reset/:email", resetPass);

userRouter.post("/resgister", resgister);
userRouter.get("/users", getUsers);
userRouter.post("/login", login);
userRouter.put("/delete/:_id", authentication, authorization, softDel);

userRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
userRouter.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    res.end(popuptools.popupResponse(req.user));
  }
);

module.exports = userRouter;

// 61a734cd947e8eba47efbc68
