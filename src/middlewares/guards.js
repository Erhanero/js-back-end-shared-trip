function isUser(req, res, next) {
    if (req.user) {
        next()
    } else {
        return res.redirect("/login");
    }
}

function isGuest(req, res, next) {
    if (req.user) {
        return res.redirect("/");
    } else {
        next();
    }
}

module.exports = {
    isUser,
    isGuest
}