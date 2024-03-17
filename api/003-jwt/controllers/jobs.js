// Importing Job model
const Job = require("./../models/Job");

// Importing custom error Classes
// As index.js file is present in errors directory so importing "./../util/errors" is importing "./../util/errors/index.js"
const {
    BadRequestError,
    NotFoundError
} = require("./../util/errors");

// This is used to return status codes
const {
    StatusCodes
} = require("http-status-codes");


// Defining the createJob controller function
const createJob = async function(req, res){

    // Getting the user detail from the request
    req.body.createdBy = req.user.userId;

    // Creating a job by using Job module
    const job = await Job.create(req.body);

    // Sending the status back
    res.status(StatusCodes.CREATED).json({
        job
    });
};

// Defining the getAllJobs controller function
const getAllJobs = async function(req, res){
    
    // Getting all the jobs created by a user
    const jobs = await Job.find({
        // User information is getting from request
        createdBy: req.user.userId
    }).sort("createdAt");

    // Sending the response
    res.status(StatusCodes.OK).json({
        jobs
    });

};

// Defining the getAJob controller function
const getAJob = async function(req, res){
    
    // Getting the job is from URL parameter
    const jobId = req.params.id;

    // Getting the user information from request
    const userId = req.user.userId;

    // Getting a job from database
    const job = await Job.findOne({
        _id: jobId,
        createdBy: userId
    });
    
    // Checking if the job is present or not
    if(!job){

        // Raising NotFoundError error
        throw new NotFoundError(`No job with id: ${jobId}`);

    }

    // Sending the response
    return res.status(StatusCodes.OK).json({
        job
    });

};


// Defining the updateJob controller function
const updateJob = async function(req, res){

    // Getting the job is from URL parameter
    const jobId = req.params.id;

    // Getting the user information from request
    const userId = req.user.userId;

    // Getting the POST data
    const company = req.body.company;
    const position = req.body.position;

    // Checking if company and position is send or not
    if(company === "" || !company || position === "" || !position){

        // Raising BadRequestError error
        throw new BadRequestError("Company or Position fields cannot be blank");

    }

    // Update a job is the database
    const job = await Job.findByIdAndUpdate({
        _id: jobId,
        createdBy: userId
    }, req.body, {
        // This will assign the updated job to the job variable, if not used then will assign job befor the update
        new: true,
        // Will run the validators while updating the job
        runValidators: true
    });

    // If job is not present then sending the raising the Error
    if(!job){

        // Raising NotFoundError error
        throw new NotFoundError(`No job with id: ${jobId}`);

    }

    // Sending the response
    return res.status(StatusCodes.OK).json({
        job
    });

};


// Defining the getAJob controller function
const deleteJob = async function(req, res){
    
    // Getting the job is from URL parameter
    const jobId = req.params.id;

    // Getting the user information from request
    const userId = req.user.userId;

    // Deleting a job from database
    const job = await Job.findByIdAndDelete({
        _id: jobId,
        createdBy: userId
    });

    // If job is not present then sending the raising the Error
    if(!job){

        // Raising NotFoundError error
        throw new NotFoundError(`No job with id: ${jobId}`);

    }

    // Sending the response
    return res.status(StatusCodes.OK).send();

};

// Exporting the controller functions
module.exports = {
    createJob,
    getAllJobs,
    getAJob,
    updateJob,
    deleteJob
};