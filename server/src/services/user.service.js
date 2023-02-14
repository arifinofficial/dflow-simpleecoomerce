const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const insert = async (body) => {
    const salt = await bcrypt.genSalt(15);

    const model = new userModel({
        firstName: body.firstName,
        lastName: body.lastName,
        username: body.username,
        email: body.email,
        password: await bcrypt.hash(body.password, salt),
        role: body.role
    });

    const data = await model.save();

    return data;
};

const find = async (body = {}) => {
    const model = await userModel.findOne(body).populate([{path: 'carts'}]);
    
    return model;
};

const generateAccessToken = async (data) => {
    const id = data._id;
    const email = data.email;
    const username = data.username;
    const firstName = data.firstName;
    const lastName = data.lastName;
    const fullName = `${firstName} ${lastName}`;
    const role = data.role;

    const accessToken = jwt.sign(
        {
            id,
            email,
            username,
            firstName,
            lastName,
            fullName,
            role
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: '10h'
        });

    const refreshToken = jwt.sign(
        {
            id,
            email,
            username,
            firstName,
            lastName,
            fullName,
            role
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: '1d'
        });

    const response = await userModel.findByIdAndUpdate(data._id, { refreshToken: refreshToken }, { new: true });

    return { ...response._doc, ...{ accessToken: accessToken } };
};

const generateRefreshToken = async (data) => {
    const id = data._id;
    const email = data.email;
    const username = data.username;
    const firstName = data.firstName;
    const lastName = data.lastName;
    const fullName = `${firstName} ${lastName}`;
    const role = data.role;
    const accessToken = jwt.sign({
        id,
        email,
        username,
        firstName,
        lastName,
        fullName,
        role
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: '10h'
    })

    return { ...data._doc, ...{ accessToken: accessToken } };
}

const logout = async (res, id) => {
    await userModel.findByIdAndUpdate(id, { refreshToken: null }, { new: true });

    res.clearCookie('refreshToken');

    return true;
}

module.exports = {
    insert,
    find,
    generateAccessToken,
    generateRefreshToken,
    logout
}