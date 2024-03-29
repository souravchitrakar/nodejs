// This module is required for async controllers, we do not need to implement try catch inside async controller function
require("express-async-errors");

// This is required to read entries from .env file
require("dotenv").config();

// Importing Express
const express = require("express");

// The connectDB is a function that is connecting the application to Database
const connectDB = require("./util/db/connect");

// The notFoundMiddleware middleware handles the not found routes
const notFoundMiddleware = require("./middleware/not-found");

// The errorHandlerMiddleware middleware handles any type of error generated by runtime of by user
const errorHandlerMiddleware = require("./middleware/error-handler");

// The authUser middleware handles the authentication of the user
const authUser = require("./middleware/authentication");

// The authRouter and jobsRouter are routers
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");

// Creating Express application
const app = express();

// This will help to read POST data using req.body sent from Postman (Body -> Raw -> JSON)
app.use(express.json());

// Registering the authRouter to the Express application
app.use("/api/v1/auth", authRouter);

// Registering the jobsRouter to the Express application, as authUser is used so authUser will be executed everytime before the request is going to jobsRouter
app.use("/api/v1/jobs", authUser, jobsRouter);

// Registering the notFoundMiddleware to the Express application
app.use(notFoundMiddleware);

// Registering the errorHandlerMiddleware to the Express application
app.use(errorHandlerMiddleware);

// Reading PORT from .env file
const port = process.env.PORT;

// Defining a function to connect the database first and then running the Express server
const start = async function(){

    try {

        // Execute the connectDB function to connect to the database with the help of MONGO_URI (coming from .env file)
        await connectDB(process.env.MONGO_URI);

        // Running the express application
        app.listen(port, function(){
            console.log(`Server is listening on Port: ${port}`);
        });

    } catch(err) {

        console.log(err);

    }

};

// Executing the start function
start();