const Trip = require("../models/Trip");
const User = require("../models/User");

function create(trip) {
    Trip.create(trip);

}

function getAll() {
    return Trip.find().lean();
}

function getOneById(id) {
    return Trip.findById(id).populate("creator").populate("buddies").lean();
}

function editTrip(id, trip) {
    return Trip.findByIdAndUpdate(id, trip);
}

function deleteTrip(id) {
    return Trip.findByIdAndDelete(id);
}

async function joinTrip(tripId, userId) {
    const trip = await Trip.findById(tripId);
    const user = await User.findById(userId);
    user.tripsHistory.push(trip);
    await user.save();
    trip.buddies.push(user);
    trip.seats -= 1;
    await trip.save();

}

async function isJoined(tripId, userId) {
    const trip = await Trip.findById(tripId).populate("buddies");
    const result = trip.buddies.
        map(x => x._id)
        .some(x => x == userId);

    return result;

}

function getUserById(id) {
    return User.findById(id).populate("tripsHistory").lean();
}


module.exports = {
    create,
    getAll,
    getOneById,
    editTrip,
    deleteTrip,
    joinTrip,
    isJoined,
    getUserById
}