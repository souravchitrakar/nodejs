const mongoose = require("mongoose");

// Defining the task model schema
const TaskSchema = mongoose.Schema({
    // Defining the fields with multiple validators
    name: {
        type: String,
        required: [true, "Please provide a name"],
        maxlength: [20, "Name can not be more than 20 characters"]
    },
    completed: {
        type: Boolean,
        default: false
    }
});

// This is the way we export model schema
// The 1st parameter is the name of the document and the 2nd parameter is the model schema
module.exports = mongoose.model("Task", TaskSchema);