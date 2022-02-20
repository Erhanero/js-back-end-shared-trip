const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const res = require("express/lib/response");
const { SECRET_TOKEN } = require("../constants");

async function register({ firstName, lastName, email, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const existing = await User.findOne({ email });

    if (existing) {
        throw new Error("Email is taken!");
    }

    const user = await User.create({ firstName, lastName, email, hashedPassword });
    return createToken(user);

}

async function login(email, password) {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Username or password is invalid!")
    }

    const isValid = await bcrypt.compare(password, user.hashedPassword);
    if (!isValid) {
        throw new Error("Username or password is invalid!");

    }

    return createToken(user);

}

function createToken(user) {


    const payload = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    }

    const token = jwt.sign(payload, SECRET_TOKEN);
    return token;
}

module.exports = {
    register,
    login
}