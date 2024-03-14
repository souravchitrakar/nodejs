const Job = require("./../models/Job");

const {
    BadRequestError,
    NotFoundError
} = require("./../util/errors");

const {
    StatusCodes
} = require("http-status-codes");


const createJob = async function(req, res){

    req.body.createdBy = req.user.userId;

    const job = await Job.create(req.body);

    res.status(StatusCodes.CREATED).json({
        job
    });
};

const getAllJobs = async function(req, res){
    
    const jobs = await Job.find({
        createdBy: req.user.userId
    }).sort("createdAt");

    res.status(StatusCodes.OK).json({
        jobs
    });

};

const getAJob = async function(req, res){
    
    const jobId = req.params.id;
    const userId = req.user.userId;

    const job = await Job.findOne({
        _id: jobId,
        createdBy: userId
    });
    
    if(!job){

        throw new NotFoundError(`No job with id: ${jobId}`);

    }

    return res.status(StatusCodes.OK).json({
        job
    });

};

const updateJob = async function(req, res){

    const jobId = req.params.id;
    const userId = req.user.userId;

    const company = req.body.company;
    const position = req.body.position;

    if(company === "" || !company || position === "" || !position){

        throw new BadRequestError("Company or Position fields cannot be blank");

    }

    const job = await Job.findByIdAndUpdate({
        _id: jobId,
        createdBy: userId
    }, req.body, {
        new: true,
        runValidators: true
    });

    if(!job){

        throw new NotFoundError(`No job with id: ${jobId}`);

    }

    return res.status(StatusCodes.OK).json({
        job
    });

};

const deleteJob = async function(req, res){
    
    const jobId = req.params.id;
    const userId = req.user.userId;

    

    const job = await Job.findByIdAndDelete({
        _id: jobId,
        createdBy: userId
    });

    console.log("I am here");

    if(!job){

        throw new NotFoundError(`No job with id: ${jobId}`);

    }

    return res.status(StatusCodes.OK).send();

};

module.exports = {
    createJob,
    getAllJobs,
    getAJob,
    updateJob,
    deleteJob
};