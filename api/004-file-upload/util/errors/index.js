// This is importing and exporting all the required things so that whenever "errors" directory is imported the this index.js file will be imported (JS feature)

const BadRequestError = require("./bad-request");
const CustomAPIError = require("./custom-api");
const NotFoundError = require("./not-found");
const UnauthenticatedError = require("./unauthenticated");

module.exports = {
    BadRequestError,
    CustomAPIError,
    NotFoundError,
    UnauthenticatedError
};