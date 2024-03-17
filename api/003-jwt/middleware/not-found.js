// This is used to return status codes
const {
    StatusCodes
} = require("http-status-codes");

// Defining the main function notFoundMiddleware
const notFoundMiddleware = async function(req, res){

    // Sending a Not Found response
    res.status(StatusCodes.NOT_FOUND).send("Route does not exists");

};

// Exporting the notFoundMiddleware function
module.exports = notFoundMiddleware;