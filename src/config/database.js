const mongoose = require("mongoose");
const connectionString = "mongodb://localhost:27017/trips";
module.exports = async () => {
    await mongoose.connect(connectionString);
}
