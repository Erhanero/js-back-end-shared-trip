const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: function (value) {
                return /[a-z]+@[a-z]+.[a-z]+/.test(value);
            }, message: "Invalid email"
        }
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ["male", "female"]

    },
    tripsHistory: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Trip",
        }
    ]

});

const User = mongoose.model("User", userSchema);

module.exports = User;
