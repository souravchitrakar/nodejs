// Importing User model
const User = require("./../models/User");

// This is used to return status codes
const {
    StatusCodes
} = require("http-status-codes");

// Importing custom error Classes
// As index.js file is present in errors directory so importing "./../util/errors" is importing "./../util/errors/index.js"
const {
    BadRequestError,
    UnauthenticatedError
} = require("./../util/errors");

// This is required for password hash
const bcrypt = require("bcryptjs");

// Defining the register controller function
const register = async function(req, res){

    // Getting the POST data sent and creating user by invoking the User model (all functionality written in the User module will be handled automatically)
    // This will help to read POST data using req.body sent from Postman (Body -> Raw -> JSON)
    const user = await User.create({
        ...req.body
    });

    // In case of successful user creation returning the response
    res.status(StatusCodes.CREATED).json({
        // Creating a token using createJWT function defined in User module
        token: user.createJWT()
    });

};

// Defining the login controller function
const login = async function(req, res){

    // Getting the POST data sent
    // This will help to read POST data using req.body sent from Postman (Body -> Raw -> JSON)
    const {
        email,
        password
    } = req.body;

    // Check if userid and password is provided or not
    if(!email || !password){

        // Raise BadRequestError
        throw new BadRequestError("Please provide Email and Password");

    }

    // Getting the user from database
    const user = await User.findOne({
        email
    });

    // Check if user is present with the userid provided
    if(!user){

        // Raising UnauthenticatedError error
        throw new UnauthenticatedError("Please provide valid email");

    }

    // Calling the comparePassword function defined in User module to check password
    const isPasswordCorrect = await user.comparePassword(password);


    // Checking is the provided password is corrent or not
    if(!isPasswordCorrect){

        // Raising UnauthenticatedError error
        throw new UnauthenticatedError("Please provide valid password");

    }

    // Creating a token using createJWT function defined in User module
    const token = user.createJWT();

    // Sending back the response
    res.status(StatusCodes.OK).json({
        token
    });

};


// Exporting the controller functions
module.exports = {
    register,
    login
};