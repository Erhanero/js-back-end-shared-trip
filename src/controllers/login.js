const router = require("express").Router();
const { isGuest, isUser } = require("../middlewares/guards");
const authService = require("../services/auth");
const mapErrors = require("../utils/mapErrors");

router.get("/login", isGuest, (req, res) => {
    res.render("login");
});

router.post("/login", isGuest, async (req, res) => {
    try {
        const token = await authService.login(req.body.email, req.body.password);
        res.cookie("app-token", token, { httpOnly: true });
        res.redirect("/");

    } catch (err) {
        const errors = mapErrors(err);
        res.render("login", { data: req.body, errors });
    }
});

router.get("/logout", isUser, (req, res) => {
    res.clearCookie("app-token");
    res.redirect("/");
});

module.exports = router;
