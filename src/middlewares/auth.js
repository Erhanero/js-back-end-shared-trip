const jwt = require("jsonwebtoken");
const { SECRET_TOKEN } = require("../constants");

function authMiddleware(req, res, next) {
    const token = req.cookies["app-token"];

    if (token) {
        try {
            const decodedToken = jwt.verify(token, SECRET_TOKEN);
            req.user = decodedToken;
            res.locals.user = decodedToken;
        } catch (err) {
            res.clearCookie("app-token");
            res.status(401).render("404");
        }
    }

    next()
}

module.exports = {
    authMiddleware
}