// Importing Express
const express = require("express");

// Importing the controller functions
const {
    createJob,
    getAllJobs,
    getAJob,
    updateJob,
    deleteJob
} = require("./../controllers/jobs");

// Defining the router
const jobsRouter = express.Router();

// Defining POST and GET routers with required route (they are sharing the same route)
jobsRouter.route("/").post(createJob).get(getAllJobs);

// Defining GET, PATCH and DELETE routers with required route (they are sharing the same route), the ":id" is the URL parameter
jobsRouter.route("/:id").get(getAJob).patch(updateJob).delete(deleteJob);

// Exporting jobsRouter
module.exports = jobsRouter;