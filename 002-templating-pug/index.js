const express = require("express");

const app = express()

// We need to install Pug using: npm install --save pug
// Setting the middleware to ask Express to use Pug as the templating engine
app.set("view engine", "pug");
// The 1st parameter will be "views" and the 2nd parameter is saying that the template files are present insied "views" directory under main project directory
app.set("views", "views");

app.get("/", function(req, res, next){

    const dynamicValues = {
        pageTitle: "Home Page",
        user: "Kuhu"
    };

    // The request will render the "pug-home.pug" template file present inside "views" directory
    // It is also passing an object, the object here has two properties pageTitle and user, those will be available in pug-home.pug file
    return res.render("pug-home", dynamicValues);

});

app.get("/about", function(req, res, next){

    const dynamicValues = {
        pageTitle: "About Page",
        users: [{
            name: "Sourav"
        }, {
            name: "Kuhu"
        }, {
            name: "Debjani"
        }]
    };

    // The request will render the "pug-about.pug" template file present inside "views" directory
    return res.render("pug-about", dynamicValues);

});

app.listen(3000);