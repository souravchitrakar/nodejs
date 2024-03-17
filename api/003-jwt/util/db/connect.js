// Importing Mongoose
const mongoose = require("mongoose");

// Defining the function to connect to the databes
const connectDB = function(url){

    // The is connecting to a database and returning a promise
    return mongoose.connect(url);

};

// Exporting the function
module.exports = connectDB;