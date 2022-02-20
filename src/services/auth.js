const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const res = require("express/lib/response");
const { SECRET_TOKEN } = require("../constants");

async function register({ email, password, gender }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const existing = await User.findOne({ email });

    if (existing) {
        throw new Error("Email is taken!");
    }

    const user = await User.create({ email, hashedPassword, gender });
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
        email: user.email,
        gender: user.gender,
    }

    const token = jwt.sign(payload, SECRET_TOKEN);
    return token;
}

module.exports = {
    register,
    login
}