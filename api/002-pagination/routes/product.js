const express = require("express");

const {
    getAllProductsPagination,
    getAllProducts
} = require("./../controllers/product");

const productRouter = express.Router();

productRouter.route("/pagination").get(getAllProductsPagination);
productRouter.route("/").get(getAllProducts);

module.exports = productRouter;