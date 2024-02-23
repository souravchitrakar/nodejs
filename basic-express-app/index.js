const express = require("express");
const bodyParesr = require("body-parser");
const path = require("path");

// Importing the router from router.js present inside the routers directory
const router = require("./routes/route");

// Creating the Express application
const app = express();

// This is a user defined middleware, here it is attached using "use". It accepts a callback
// Any request comes to the server, this middleware will be executed
app.use(function(req, res, next){

    console.log("I am into middleware");

    // As next is called, the next middleware will be executed after this
    next();

});

// This is a 3rd party middleware to read the HTML form data, use this part as it is
// The control will go to the next middleware after executing this middleware
app.use(bodyParesr.urlencoded({
    extended: false
}));

// This is an Express middleware, used to define static file directory to deliver static contents
// Here the full path of the directory is required
// When we are defining the path for the static file we have to start with "." which means the static directory. Here the static directory is public, so to access a css file main.css present inside css directory (which is present inside public) we have to use "./css/main.css" inside HTML, no need to mention public in the path ("." is assumed public")
// Only the files present inside the static directory can be accessed from clients using the file path (other files can be exposed using URLs), for example "http://localhost:3000/css/main.css" can be used to access the main.css file
// The control will go to the next middleware after executing this middleware
app.use(express.static(path.join(__dirname, "public")));

// Attaching the router defined in router.js inside routers directory using middleware
// If URL is not handled by the router then the next middleware will be executed
// Multiple routers can be attached
// The 1st parameter is the URL prefix for the router (here we are keeping it blank)
app.use("/", router);

// The router middleware failed to handle the requested URL so we are handling page not found response here as if the request comes here after router middleware then it will be executed for sure
app.use(function(req, res, next){

    // Sending response to every request is mandatory, else the server will hang
    // The sendFile needs the full path of the HTML file, here setting the HTTP status as well
    return res.status(404).sendFile(path.join(__dirname, "views/404.html"));

});

// Application is listening to the port 3000
app.listen(3000);