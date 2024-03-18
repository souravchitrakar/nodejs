// The workflow is user will uploa one image first, if user is uploading image 1.jpg then the image will be saved inside images directory of public directory (static directory)
// As public is static directory so http://localhost:3000/images/1.jpg will give the access to the saved image
// Take the path and create the product
// Workflow can be handled in other way also



// This module is required for async controllers, we do not need to implement try catch inside async controller function
require("express-async-errors");


const fileUpload = require("express-fileupload");

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

// The productRouter and jobsRouter are routers
const productRouter = require("./routes/product-route");

// Creating Express application
const app = express();

app.use(express.static("./public"));

// This will help to read POST data using req.body sent from Postman (Body -> Raw -> JSON)
app.use(express.json());

app.use(fileUpload());

// Registering the productRouter to the Express application
app.use("/api/v1/products", productRouter);

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