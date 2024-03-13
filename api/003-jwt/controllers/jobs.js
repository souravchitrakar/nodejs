


const createJob = async function(req, res){
    res.send("Create job");
};

const getAllJobs = async function(req, res){
    res.send("Get all jobs");
};

const getJob = async function(req, res){
    res.send("Get a single job");
};

const updateJob = async function(req, res){
    res.send("Update a job");
};

const deleteJob = async function(req, res){
    res.send("Delete a job");
};

module.exports = {
    createJob,
    getAllJobs,
    getJob,
    updateJob,
    deleteJob
};