const express = require("express");

// Importing the user defined controller functions
const {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
} = require("./../controllers/task");

// Defining a router
const taskRouter = express.Router();

// Attaching the GET, POST etc. methods to the router
// Same methods are chained who are sharing same URL
taskRouter.route("/").get(getAllTasks).post(createTask);
// The ":id" is the route parameter
taskRouter.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

module.exports = taskRouter;