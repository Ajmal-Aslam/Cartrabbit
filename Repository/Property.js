const Property = require("../Schemas/Property");

//creating the Properties data:

exports.create = async (data) => {
    try {
        const property = new Property(data);
        await property.save();
    } catch (error) {
        throw error
    }
};

//get all the Properties list:

exports.getall = async () => {
    try {
        return await Property.find({}).populate('Owner', 'name');
    } catch (error) {
        throw error
    }
};

//find the Properties by id and delete them

exports.deleting = async (id) => {
    try {
        return await Property.deleteOne({ _id: id });
    } catch (error) {
        throw error
    }
}

//find the Properties by id and update them
exports.Updating = async (id, data) => {
    try {
        const owner = await Property.updateOne({ _id: id }, { $set: data });
        return owner;

    } catch (error) {
        throw error
    }
}



