// Importing the mongoose model
const Task = require("./../models/task");


// All the controller functions are defined, the must be async
// The "try catch" is not used as "express-async-errors" is used in server.js
const getAllTasks = async function(req, res){

    // Getting all the tasks
    // This should be executed in async mode
    const tasks = await Task.find({});

    res.status(200).json({
        tasks
    });

};

const createTask = async function(req, res){

    // Creating a task
    // This should be executed in async mode
    // The req.body is the body JSON sent with POST
    const task = await Task.create(req.body);

    return res.status(201).json({
        task
    });

};

const getTask = async function(req, res){

    // Fetching the id from route parameter (req.params) and assigning to taskID
    const {
        id: taskID
    } = req.params;

    // Getting one single task
    // This should be executed in async mode
    const task = await Task.findOne({
        _id: taskID
    });

    if(!task){
        return res.status(404).json({
            message: `ID ${taskID} does not present`
        });
    }

    return res.status(200).json({
        task
    });

};

const updateTask = async function(req, res){

    const {
        id: taskID
    } = req.params;

    // Updating a single task
    // This should be executed in async mode
    // The 3rd Object passwd to findOneAndUpdate is multiple properties. The "new" is saying "task" will get the updated values, "runValidators" is saying run the validatory (defined the model) while running update
    const task = await Task.findOneAndUpdate({
        _id: taskID
    }, req.body, {
        new: true,
        runValidators: true
    });

    if(!task){
        return res.status(404).json({
            message: `ID ${taskID} does not present`
        });
    }

    return res.status(200).json({
        task
    });

};

const deleteTask = async function(req, res){

    const {
        id: taskID
    } = req.params;

    const task = await Task.findOneAndDelete({
        _id: taskID
    });

    if(!task){
        return res.status(404).json({
            message: `ID ${taskID} does not present`
        });
    }

    return res.status(200).send();

};

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
};