const path = require("path");
const express = require("express");

// Creating the router
const router = express.Router();

// Adding a get middleware, any request with "/add-product" URL and GET HTTP verbe will execute the callback function
router.get("/add-product", function(req, res, next){

    return res.sendFile(path.join(__dirname, "../views/add-product.html"));

});

// Adding a POST middleware
router.post("/product", function(req, res, next){

    console.log(req.body.title);

    // Redirecting to the required URL
    return res.redirect("/");

});

router.get("/", function(req, res, next){

    return res.sendFile(path.join(__dirname, "../views/home.html"));

});

module.exports = router;