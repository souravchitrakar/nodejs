// Importing Mongoose
const mongoose = require("mongoose");

// Defining Job model
const ProductSchema = new mongoose.Schema({

    // This is a field
    name: {
        type: String,
        // These are validations
        required: [true, "Please provide name"]
    },
    price: {
        type: Number,
        required: [true, "Please provide price"]
    },
    image: {
        type: String,
        required: [true, "Please provide image URL"]
    }
})

// To export Mongoose model we need to follow this syntax
module.exports = mongoose.model("Product", ProductSchema);