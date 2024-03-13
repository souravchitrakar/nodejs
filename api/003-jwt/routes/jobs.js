const express = require("express");

const {
    createJob
} = require("./../controllers/jobs");

const jobsRouter = express.Router();

jobsRouter.route("/").post(createJob);

module.exports = jobsRouter;