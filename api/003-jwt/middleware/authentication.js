const {
    UnauthenticatedError
} = require("./../util/errors");

const jwt = require("jsonwebtoken");

const authUser = async function(req, res, next){

    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer")){

        throw new UnauthenticatedError("Authentication Invalid");

    }

    const token = authHeader.split(" ")[1];

    try{

        const payload = jwt.verify(token, process.env.JWT_SECRET);

        req.user = {
            userId: payload.userId
        };

        next();

    } catch(err){

        throw new UnauthenticatedError("Authentication Invalid");

    }

};

module.exports = authUser;