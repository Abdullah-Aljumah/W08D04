const express = require("express");
const roleRouter = express.Router();
const authentication = require("../authentication");
const authorization = require("../authorization");

const { newRole, getRoles } = require("../controllers/role");

roleRouter.post("/newRole", authentication, authorization, newRole);
roleRouter.get("/roles", authentication, authorization, getRoles);

module.exports = roleRouter;
