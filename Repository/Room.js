const Room = require("../Schemas/Room");

//creating rooms blog:
exports.create = async (data) => {
    try {
        const room = new Room(data);
        await room.save();
    } catch (error) {
        throw error
    }
};

//available rooms

exports.getall = async () => {
    try {
        return await Room.find().populate('property');
    } catch (error) {
        throw error
    }
};

//deleting the unwanted rooms:
exports.deleting = async (id) => {
    try {
        return await Room.deleteOne({ _id: id });
    } catch (error) {
        throw error
    }
}
//updating the modified rooms:

exports.Updating = async (id, data) => {
    try {
        const owner = await Property.updateOne({ _id: id }, { $set: data });
        return owner;

    } catch (error) {
        throw error
    }
}


