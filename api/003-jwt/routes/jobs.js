const express = require("express");

const {
    createJob,
    getAllJobs,
    getAJob,
    updateJob,
    deleteJob
} = require("./../controllers/jobs");

const jobsRouter = express.Router();

jobsRouter.route("/").post(createJob).get(getAllJobs);
jobsRouter.route("/:id").get(getAJob).patch(updateJob).delete(deleteJob);

module.exports = jobsRouter;