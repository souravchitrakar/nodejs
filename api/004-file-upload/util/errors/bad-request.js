// This is used to return status codes
const {
    StatusCodes
} = require("http-status-codes");

// Importing the user defined CustomAPIError error
const CustomAPIError = require("./custom-api");

// Defining the BadRequestError class by extending CustomAPIError
class BadRequestError extends CustomAPIError {

    constructor(message){

        super(message);
        this.statusCode = StatusCodes.BAD_REQUEST;

    }

}

// Exporting BadRequestError
module.exports = BadRequestError;