const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    //refer from property
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property'
    },
    RoomSize: {
        type: Number,
        required: true
    },
    beds: {
        type: Number,
        required: true
    },
    rentAmount: {
        type: Number,
        required: true
    },
    photos: [{
        type: String
    }],
    //refer from booking
    bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking'
    }]
});

module.exports = mongoose.model('Room', roomSchema);
