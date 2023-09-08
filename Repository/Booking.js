const Booking = require("../Schemas/Booking");

//creating the :
exports.create = async (data) => {
    try {
        const booking = new Booking(data);
        await booking.save();
    } catch (error) {
        throw error
    }
};

//get all the Bookings list:
exports.getall = async () => {
    try {
        return await Booking.find({});
    } catch (error) {
        throw error
    }
};

//find the Booking by id and delete them
exports.deleting = async (id) => {
    try {
        return await Booking.deleteOne({ _id: id });
    } catch (error) {
        throw error
    }
}
//find the Booking by id and update them

exports.Updating = async (id) => {
    try {
        const Bookings = await Booking.findByIdAndUpdate({ _id: id });
    } catch (error) {
        throw error
    }
}

