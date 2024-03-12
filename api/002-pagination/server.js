require("express-async-errors");
require("dotenv").config();

const express = require("express");

const connectDB = require("./util/db/connect");
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");
const productRouter = require("./routes/product");

const app = express();

app.use("/api/v1/products", productRouter);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT;

const start = async function(){

    try {

        await connectDB(process.env.MONGO_URI);

        app.listen(port, function(){
            console.log(`Server is listening on Port: ${port}`);
        });

    } catch(err) {

        console.log(err);

    }

};

start();