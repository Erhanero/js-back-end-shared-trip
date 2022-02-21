const Trip = require("../models/Trip");

function create(trip) {
    Trip.create(trip);

}

function getAll() {
    return Trip.find().lean();
}

function getOneById(id) {
    return Trip.findById(id).lean();
}

function editTrip(id, trip) {
    return Trip.findByIdAndUpdate(id, trip);
}

function deleteTrip(id) {
    return Trip.findByIdAndDelete(id);
}

async function joinTrip(tripId, userId) {
    const trip = await Trip.findById(tripId);
    const user = await Trip.findById(userId);
    // console.log(user)
    user.tripsHistory.push(trip)
    await user.save();
    trip.buddies.push(user);
    trip.seats -= 1;
    await trip.save();

}


module.exports = {
    create,
    getAll,
    getOneById,
    editTrip,
    deleteTrip,
    joinTrip
}