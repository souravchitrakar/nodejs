// Importing Job model
const Product = require("./../models/Product");

// This is used to return status codes
const {
    StatusCodes
} = require("http-status-codes");

// Defining the createProduct controller function
const createProduct = async function(req, res){

    // Creating a product
    const product = await Product.create(req.body);

    // Sending the response
    res.status(StatusCodes.CREATED).json({
        product
    });

};

// Defining the getAllProducts controller function
const getAllProducts = async function(req, res){

    // Getting all the products
    const products = await Product.find({});

    // Sending back the response
    res.status(StatusCodes.OK).json({
        products
    });

};

// Exporting the controller functions
module.exports = {
    createProduct,
    getAllProducts
};