// Importing Mongoose
const mongoose = require("mongoose");

// This is required to generate hashed password
const bcrypt = require("bcryptjs");

// This is required to generate JSON token
const jwt = require("jsonwebtoken");

// Defining User model
const UserSchema = mongoose.Schema({
    
    // Defining name field
    name: {
        type: String,
        // These are the validations
        required: [true, "Please provide name"],
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
    }
});

// Whenever an user is saved to database befor that this block will be executed as "pre" and "save" is used here
UserSchema.pre("save", async function(){

    // This is required to generate hashed password
    const salt = await bcrypt.genSalt(10);

    // Using the password used before saving and hashing it and reassigning to password
    this.password = await bcrypt.hash(this.password, salt);

});

// Defining method createJWT using methods so it will be available to each user as method
UserSchema.methods.createJWT = function() {

    // Generating JWT token, three things need to pass to sign, 1st one is payload (information that can be retrived from the tokan, keep it small), 2nd one is secret key coming from .env file and 3rd is the life time also coming from .env file
    return jwt.sign({
        userId: this._id,
        name: this.name
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME
    });

};

// Defining method comparePassword using methods so it will be available to each user as method
UserSchema.methods.comparePassword = async function(candidatePassword){

    // Comparing the provided password with hashed password (it will return true or false)
    const isMatch = await bcrypt.compare(candidatePassword, this.password);

    return isMatch;

};

// To export Mongoose model we need to follow this syntax
module.exports = mongoose.model("User", UserSchema);