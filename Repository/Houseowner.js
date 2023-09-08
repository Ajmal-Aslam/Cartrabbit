const Houseowner = require("../Schemas/Houseowner");

const CryptoJS = require("crypto-js");
const secKey = "Awesome";


//creating the Houseowner data:

exports.create = async (data) => {
    try {
        const houseOwner = new Houseowner(data);
        await houseOwner.save();
    } catch (error) {
        throw error
    }
};

//get all the Houseowner list:

exports.getall = async () => {
    try {
        return await Houseowner.find({});
    } catch (error) {
        throw error
    }
};
//get particular owner:
exports.getUserByEmail = async (email) => {
    try {
        return await Houseowner.find({ email });
    } catch (error) {
        throw error;
    }
};

//if you want to reset the password:
exports.resetPassword = async (id, password) => {
    try {
        const encryptData = CryptoJS.AES.encrypt(password, secKey).toString();
        const data = { password: encryptData };
        return await Houseowner.updateOne({ _id: id }, data);
    } catch (error) {
        throw error;
    }
};

//find the Houseowner by id and delete them

exports.deleting = async (id) => {
    try {
        return await Houseowner.deleteOne({ _id: id });
    } catch (error) {
        throw error
    }
}
//find the Houseowner by id and update them

exports.Updating = async (id, data) => {
    try {
        const owner = await Houseowner.updateOne({ _id: id }, { $set: data });
        return owner;

    } catch (error) {
        throw error
    }
}

