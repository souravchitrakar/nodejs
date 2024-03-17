// This is user defined error
// As index.js file is present in errors directory so importing "./../util/errors" is importing "./../util/errors/index.js"
const {
    UnauthenticatedError
} = require("./../util/errors");

// This is required for JSON token
const jwt = require("jsonwebtoken");

// Defining the authUser function
const authUser = async function(req, res, next){

    // Getting the token from the request sent from Postman (Authorization -> Bearer -> Token)
    const authHeader = req.headers.authorization;

    // Checking if token is send and send in "Bearer <token>" format
    if(!authHeader || !authHeader.startsWith("Bearer")){

        // Raising the custom UnauthenticatedError error
        throw new UnauthenticatedError("Authentication Invalid");

    }

    // Getting the token from "Bearer <token>" format
    const token = authHeader.split(" ")[1];

    try{

        // Getting the payload from the token is valid token is passed, in case of invalid token it will go to the catch block
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        // Attaching the user information to the request
        req.user = {
            userId: payload.userId
        };

        // Executing the next middleware
        next();

    } catch(err){

        // Raising UnauthenticatedError custom error
        throw new UnauthenticatedError("Authentication Invalid");

    }

};

// Exporting authUser
module.exports = authUser;