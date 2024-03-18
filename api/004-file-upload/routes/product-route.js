// Importing Express
const express = require("express");

// Importing the controller functions
const {
    createProduct,
    getAllProducts
} = require("./../controllers/product-controller");
const {
    uploadProductImage
} = require("./../controllers/uploads-controller");

// Defining the router
const productRouter = express.Router();

// Defining POST and GET routers with required route (they are sharing the same route)
productRouter.route("/").post(createProduct).get(getAllProducts);

// Defining POST router
productRouter.route("/uploads").post(uploadProductImage);

// Exporting jobsRouter
module.exports = productRouter;