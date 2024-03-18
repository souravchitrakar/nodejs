// Importing user defined CustomAPIError
// As index.js file is present in errors directory so importing "./../util/errors" is importing "./../util/errors/index.js"
const {
    CustomAPIError
} = require("./../util/errors");

// This is used to return status codes
const {
    StatusCodes
} = require("http-status-codes");

// Defining the main function errorHandlerMiddleware
const errorHandlerMiddleware = async function(err, req, res, next){

    // If error is raised by used then response is send accordingly
    if(err instanceof CustomAPIError){
        return res.status(err.statusCode).json({
            message: err.message
        });
    }

    // In the error is not user defined (that means internal server error) then response is send accordingly
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        err
    });

};

// Exporting the errorHandlerMiddleware function
module.exports = errorHandlerMiddleware;