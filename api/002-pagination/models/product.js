const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"]
    },
    price: {
        type: Number,
        required: [true, "Please provide a price"]
    },
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 4.5
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    company: {
        type: String,
        // Value if the field can only be one from the given list
        // Error message is also assigned where "{VALUE}" is the value that is provided
        enum: {
            values: ['ikea', 'marcos', 'caressa', 'liddy'],
            message: '{VALUE} is not supported'
        }
    }
});

module.exports = mongoose.model("Product", ProductSchema);