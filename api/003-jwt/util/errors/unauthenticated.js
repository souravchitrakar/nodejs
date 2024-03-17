// This is used to return status codes
const {
    StatusCodes
} = require("http-status-codes");

// Importing the user defined CustomAPIError error
const CustomAPIError = require("./custom-api");

// Defining the UnauthenticatedError class by extending CustomAPIError
class UnauthenticatedError extends CustomAPIError {

    constructor(message){

        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED;

    }

}

// Exporting UnauthenticatedError
module.exports = UnauthenticatedError;