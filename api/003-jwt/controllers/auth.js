const User = require("./../models/User");
const {
    StatusCodes
} = require("http-status-codes");

const {
    BadRequestError,
    UnauthenticatedError
} = require("./../util/errors");

const bcrypt = require("bcryptjs");

const register = async function(req, res){

    const user = await User.create({
        ...req.body
    });

    res.status(StatusCodes.CREATED).json({
        token: user.createJWT()
    });

};

const login = async function(req, res){

    const {
        email,
        password
    } = req.body;

    if(!email || !password){

        throw new BadRequestError("Please provide Email and Password");

    }

    const user = await User.findOne({
        email
    });

    if(!user){

        throw new UnauthenticatedError("Please provide valid email");

    }

    const isPasswordCorrect = await user.comparePassword(password);


    if(!isPasswordCorrect){

        throw new UnauthenticatedError("Please provide valid password");

    }

    const token = user.createJWT();

    res.status(StatusCodes.OK).json({
        token
    });

};

module.exports = {
    register,
    login
};