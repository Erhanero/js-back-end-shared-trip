const router = require("express").Router();
const tripService = require("../services/trips");
const mapErrors = require("../utils/mapErrors");
const { isUser } = require("../middlewares/guards");

router.get("/trips/offer", isUser, (req, res) => {
    res.render("trip-create");
});

router.post("/trips/offer", isUser, async (req, res) => {
    const { startPoint, endPoint, date, time, carImage, carBrand, seats, price, description } = req.body;
    try {
        await tripService.create({ startPoint, endPoint, date, time, carImage, carBrand, seats, price, description, creator: req.user._id });
        res.redirect("/trips/shared");
    } catch (err) {
        const errors = mapErrors(err);
        res.render("trip-create", { errors })
    }
});

router.get("/trips/shared", async (req, res) => {
    const trips = await tripService.getAll();
    res.render("shared-trips", { trips });
});

router.get("/details/:tripId", async (req, res) => {
    const trip = await tripService.getOneById(req.params.tripId);
    const isOwner = req.user && req.user._id == trip.creator;
    res.render("trip-details", { trip, isOwner })
});

router.get("/edit/:tripId", async (req, res) => {
    const trip = await tripService.getOneById(req.params.tripId);
    res.render("trip-edit", { trip })
});

router.post("/edit/:tripId", async (req, res) => {
    await tripService.editTrip(req.params.tripId, req.body);
    res.redirect(`/details/${req.params.tripId}`)
});

router.get("/delete/:tripId", async (req, res) => {
    await tripService.deleteTrip(req.params.tripId);
    res.redirect("/trips/shared");
});

router.get("/trips/join/:tripId", async (req, res) => {
    await tripService.joinTrip(req.params.tripId, req.user._id);
    res.redirect(`/details/${req.params.tripId}`);

});

module.exports = router;