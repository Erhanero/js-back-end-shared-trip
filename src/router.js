const router = require("express").Router();
const homeController = require("./controllers/home");
const registerController = require("./controllers/register");
const loginController = require("./controllers/login");
const tripsController = require("./controllers/trips");

router.use(homeController);
router.use(registerController);
router.use(loginController);
router.use(tripsController)

router.get("*", (req, res) => {
    res.render("404")
})

module.exports = router;
