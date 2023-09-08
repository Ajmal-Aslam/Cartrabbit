const Customer = require("../Schemas/Customer");
const CryptoJS = require("crypto-js");

const secKey = "AWESOME";

//creating the customer data:
exports.create = async (data) => {
    try {
        const customer = new Customer(data);
        await customer.save();
    } catch (error) {
        throw error
    }
};

//get all the customers list:
exports.getall = async () => {
    try {
        return await Customer.find({});
    } catch (error) {
        throw error
    }
};

//particular by id
exports.getone = async (id) => {
    try {
        return await Customer.find({ _id: id });
    } catch (error) {
        throw error
    }
}

//get  customer :
exports.getUserByEmail = async (email) => {
    try {
        return await Customer.find({ email });
    } catch (error) {
        throw error;
    }
};

//if you want to reset the password:
exports.resetPassword = async (id, password) => {
    try {
        const encryptData = CryptoJS.AES.encrypt(password, secKey).toString();
        const data = { password: encryptData };
        return await Customer.updateOne({ _id: id }, data);
    } catch (error) {
        throw error;
    }
};

//find the customer by id and delete them
exports.deleting = async (id) => {
    try {
        return await Customer.deleteOne({ _id: id });
    } catch (error) {
        throw error
    }
}
//find the customer by id and update them
exports.Updating = async (id, data) => {
    try {
        const customers = await Customer.updateOne({ _id: id }, { $set: data });
        return customers;

    } catch (error) {
        throw error
    }
}


