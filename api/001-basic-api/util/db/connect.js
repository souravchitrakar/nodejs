const mongoose = require("mongoose");

const connectDB = function(url){

    // This is returning a Promise
    return mongoose.connect(url);

};

module.exports = connectDB;