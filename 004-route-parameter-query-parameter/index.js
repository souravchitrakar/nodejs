const express = require("express");

const app = express();

app.get("/", function(req, res, next){

    res.send("<h1>From Home</h1>");

});

// Try the URL: http://localhost:3000/delete?name=Kuhu&age=0
// The "/:param" is saying http://localhost:3000/<anything> will populate <anything> to the URL parameter
app.get("/:param", function(req, res, next){

    // The URL parameters will be available inside the req.params object
    console.log(req.params.param);

    // The query parameters will be available inside the req.query object
    console.log(req.query);

    res.send("<h1>From Other Route</h1>");

});

// The request will not come to the middleware ever, the above one will catch the http://localhost:3000/delete URL
// If we want to have this URL then it should be placed above
app.get("/delete", function(req, res, next){

    res.send("<h1>From No Execution</h1>");

});

app.listen(3000);