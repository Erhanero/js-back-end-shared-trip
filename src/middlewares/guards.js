const tripService = require("../services/trips");

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

async function isOwner(req, res, next) {
    const trip = await tripService.getOneById(req.params.tripId);
    if (trip.creator._id == req.user._id) {
        next();
    } else {
        res.redirect("/");

    }

}

module.exports = {
    isUser,
    isGuest,
    isOwner
}