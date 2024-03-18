// Defining the CustomAPIError class by extending the Error class
class CustomAPIError extends Error {

    constructor(message) {

        super(message);

    }

}

// Exporting CustomAPIError class
module.exports = CustomAPIError;