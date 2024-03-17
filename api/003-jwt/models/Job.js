// Importing Mongoose
const mongoose = require("mongoose");

// Defining Job model
const JobSchema = new mongoose.Schema({

    // This is a field
    company: {
        type: String,
        // These are validations
        required: [true, "Please provide company name"],
        maxlength: 50
    },
    position: {
        type: String,
        required: [true, "Please provide position"],
        maxlength: 100
    },
    status: {
        type: String,
        enum: ["interview", "declined", "pending"],
        default: "pending"
    },
    createdBy: {
        // This is creating the relation between Post and User models
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide user"],
    }
}, {
    // This is passed as 2nd object to Schema, so timestamp information will be added
    timestamps: true 
});

// To export Mongoose model we need to follow this syntax
module.exports = mongoose.model("Job", JobSchema);

