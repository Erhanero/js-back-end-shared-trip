const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
    startPoint: {
        type: String,
        required: true,
        minlength: [4, "Starting point should be at least 4 characters long"]
    },
    endPoint: {
        type: String,
        required: true,
        minlength: [4, "End point should be at least 4 characters long"]
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    carImage: {
        type: String,
        required: true,
        validate: {
            validator(value) {
                return /^https?:\/\//.test(value);
            }
        }, message: "Invalid url"
    },

    carBrand: {
        type: String,
        required: true,
        minlength: [4, "Car Brand should be minimum 4 characters long"]
    },
    seats: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: [1, "Price should be positive number from 1 to 50 inclusive"]
    },
    description: {
        type: String,
        required: true,
        minlength: [10, "Description should be minimum 10 caracters long"]
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    buddies: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User",
        }
    ]
});

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;