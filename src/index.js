const express = require("express");
const expressConfig = require("./config/express");
const initDataBase = require("./config/database");
const router = require("./router");
const { authMiddleware } = require("./middlewares/auth");

const app = express();
expressConfig(app);

app.use(authMiddleware);
app.use(router);


try {
    initDataBase()
    app.listen(3000, () => console.log(`Application is running on http://localhost:3000`))
} catch (err) {
    console.log("Database error...")
}


