// We need to run the controller functions (functions which run when GET, POST etc. gets called) in async mode to mot block the Node main loop
// This package will help use to use any "await" code without try catch in async controller functions
// If any error occurs or manually raised, it will come to the last middleware attached to the application (here it is errorHandler)
require("express-async-errors");

// This is to read .env file
require("dotenv").config();

const express = require("express");

// Importing multiple user defined packages
const taskRouter = require("./routes/task");
const connectDB = require("./util/db/connect");
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");

const app = express();

// Reading the PORT value from .env
const port = process.env.PORT;

// This middleware is used to parse the incoming body JSON (req.body) to Object
app.use(express.json());

// Registering the defined router with URL prefic "/api/v1/tasks"
app.use("/api/v1/tasks", taskRouter);

// This is the "not found middleware", if router is not able to handle any request then it will come here and will be handled
app.use(notFound);

// Any kind of error will be handled here
app.use(errorHandler);


// This async function will help to connect the DB first then it will start the server
const start = async function() {

    try{

        // Calling the user defined connectDB function
        // Reading the MONGO_URI from .env file
        await connectDB(process.env.MONGO_URI);

        // Starting the server
        app.listen(port, function(){
            console.log(`Server is listening on Port: ${port}`);
        });

    } catch(err){

        console.log(err);

    }

};

// Calling the start function
start();

