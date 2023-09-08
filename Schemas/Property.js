const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    //refer from owner schema
    Owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HouseOwner'
    },

    MinBookingPeriod: {
        type: Number,
        default: 1
    },
    MaxBookingPeriod: {
        type: Number,
        default: 30
    }
});




module.exports = mongoose.model('Property', propertySchema);
