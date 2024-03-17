// This is used to return status codes
const {
    StatusCodes
} = require("http-status-codes");

// Importing the user defined CustomAPIError error
const CustomAPIError = require("./custom-api");

// Defining the NotFoundError class by extending CustomAPIError
class NotFoundError extends CustomAPIError {

    constructor(message){

        super(message);
        this.statusCode = StatusCodes.NOT_FOUND;

    }

}

// Exporting NotFoundError
module.exports = NotFoundError;