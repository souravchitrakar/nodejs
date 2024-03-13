require("express-async-errors");
require("dotenv").config();

const express = require("express");

const connectDB = require("./util/db/connect");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");
const authUser = require("./middleware/authentication");

const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authUser, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

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