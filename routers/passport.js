const userModel = require("../db/models/user");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { request } = require("express");

dotenv.config();

const SECRETKEY = process.env.SECRET_KEY;

passport.use(
  new GoogleStrategy(
    {
      callbackURL: "http://localhost:5000/auth/google/callback",
      clientID:
        "186579919465-58fvchi49hbf0f62910cqndnuc4gjsgc.apps.googleusercontent.com",
      clientSecret: "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",
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      console.log(profile._json.email);
      const email = profile._json.email;
      const username = profile._json.name;

      try {
        const user = await userModel.findOne({
          $or: [{ username }, { email }],
        });

        if (user) {
          const payload = {
            id: user._id,
            email: user.email,
            username: user.username,
            role: user.role,
            isDel: user.isDel,
          };

          const token = jwt.sign(payload, SECRETKEY);

          return done(null, { result: user, token });
        } else {
          const newUser = new userModel({
            email: email,
            password: username,
            username: username,
            avatar: profile._json.picture,
            activate: true,
          });

          newUser.save().then(async (result) => {
            const res = await userModel.findOne({ _id: result._id });

            const payload = {
              id: res._id,
              email: res.email,
              username: res.username,
              isDel: res.isDel,
            };

            const token = jwt.sign(payload, SECRETKEY);

            return done(null, { result: res, token });
          });
        }
      } catch (error) {
        console.log("error is:", error.message);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
