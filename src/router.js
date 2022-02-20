const router = require("express").Router();
const homeController = require("./controllers/home");
const registerController = require("./controllers/register");
const loginController = require("./controllers/login");

router.use(homeController);
router.use(registerController);
router.use(loginController);

module.exports = router;
