const mongoose = require("mongoose");
const connectionString = "mongodb://localhost:27017/wildlife";

module.exports = async () => {
    await mongoose.connect(connectionString);
}
