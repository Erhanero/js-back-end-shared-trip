const Trip = require("../models/Trip");

function create(trip) {
    Trip.create(trip);

}

function getAll() {
    return Trip.find().lean();
}

module.exports = {
    create,
    getAll
}