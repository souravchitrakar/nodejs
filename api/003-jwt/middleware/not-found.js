const {
    StatusCodes
} = require("http-status-codes");

const notFoundMiddleware = async function(req, res){

    res.status(StatusCodes.NOT_FOUND).send("Route does not exists");

};

module.exports = notFoundMiddleware;