const { timeStamp } = require('console');
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    //refer from customer
    customer: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    }],

    //date to be specified from and To
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    }

}
);

module.exports = mongoose.model('Booking', bookingSchema);