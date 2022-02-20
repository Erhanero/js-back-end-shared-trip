const router = require("express").Router();
const tripService = require("../services/trips");
const mapErrors = require("../utils/mapErrors");

router.get("/trips/offer", (req, res) => {
    res.render("trip-create");
});

router.post("/trips/offer", async (req, res) => {
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
    res.render("shared-trips", { trips })
});

module.exports = router;