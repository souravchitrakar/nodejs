const express = require("express");

const app = express()

// We need to install ejs using: npm install --save ejs
// Setting the middleware to ask Express to use ejs as the templating engine
app.set("view engine", "ejs");
// The 1st parameter will be "views" always and the 2nd parameter is saying that the template files are present insied "views" directory under main project directory
app.set("views", "views");

app.get("/", function(req, res, next){

    const dynamicValues = {
        pageTitle: "Home Page",
        ourCompany: "ABC",
        user: "Kuhu"
    };

    // The request will render the "ejs-home.ejs" template file present inside "views" directory
    // It is also passing an object, the object here has two properties pageTitle and user, those will be available in ejs-home.ejs file
    return res.render("ejs-home", dynamicValues);

});

app.get("/about", function(req, res, next){

    const dynamicValues = {
        pageTitle: "About Page",
        ourCompany: "ABC",
        users: [{
            name: "Sourav"
        }, {
            name: "Kuhu"
        }, {
            name: "Debjani"
        }]
    };

    // The request will render the "ejs-about.ejs" template file present inside "views" directory
    return res.render("ejs-about", dynamicValues);

});

app.listen(3000);