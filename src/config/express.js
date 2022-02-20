const express = require("express");
const hbs = require("express-handlebars");
const cookieParser = require("cookie-parser");


module.exports = (app) => {
    app.engine("hbs", hbs.create({
        extname: ".hbs"
    }).engine);
    app.set("view engine", "hbs");
    app.set("views", "./src/views");

    app.use(express.static("src"));
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
}