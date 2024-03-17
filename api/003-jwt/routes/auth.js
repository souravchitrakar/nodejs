// Importing Express
const express = require("express");

// Importing the controller functions
const {
    register,
    login
} = require("./../controllers/auth");

// Defining the router
const authRouter = express.Router();

// Defining a POST router with required route
authRouter.route("/register").post(register);

// Defining a POST router with required route
authRouter.route("/login").post(login);

// Exporting the authRouter
module.exports = authRouter;