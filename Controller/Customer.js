const Customer = require("../Repository/Customer");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken")

const secKey = "AWESOME";

//createor signin for customer

exports.createUser = async (req, res) => {
    try {
        const { password } = req.body;
        const encryptData = CryptoJS.AES.encrypt(password, secKey).toString();
        req.body.password = encryptData;
        await Customer.create(req.body);
        res.status(200).send("created Successfully");
    } catch (error) {
        throw error;
    }
};


//get the customer by some datas or propereties
exports.AllUser = async (req, res) => {
    try {
        let persons = await Customer.getall();
        console.log(persons);
        return res.status(200).send(persons);
    } catch (error) {
        throw error
    }
}

//get the particular customer by id:

exports.OneUser = async (req, res) => {
    try {
        const getemployee = await Customer.getone(req.params.id);
        res.status(200).send(getemployee);
    } catch (error) {
        throw error
    }
}

//login again and creating a   tokens to generate the data:

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const loginUsers = await Customer.getUserByEmail(email);
        if (loginUsers.length === 0) {
            return res.status(401).send("User not Found");
        }
        const bytes = CryptoJS.AES.decrypt(loginUsers[0].password, secKey);
        const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
        if (decryptedPassword === password) {
            req.result = loginUsers;
            next();
        } else {
            return res.status(401).send("Login Failure");
        }
    } catch (error) {
        throw error;
    }
};

exports.generateToken = async (req, res) => {
    try {
        const token = jwt.sign(JSON.stringify(req.result), secKey);
        const outPut = {
            status: 200,
            result: {
                UserDetails: req.result,
                token: token,
            },
            message: "Login Successfully",
        };
        res.status(200).send(outPut);
    } catch (error) {
        throw error;
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { password } = req.body;
        await Customer.resetPassword(id, password);
        res.status(200).send("Your password has been reset");
    } catch (error) {
        throw error;
    }
};

//delete the customers
exports.Deleted = async (req, res) => {
    const delete_Customer = await Customer.deleting(req.params.id);
    res.status(200).send("sucessfulley deleted");
}

//updating the customers bio:
exports.Updated = async (req, res) => {
    let id = req.params.id;
    const update_Customer = await Customer.Updating({ _id: id }, req.body);
    console.log(update_Customer);
    res.status(200).send(update_Customer);
}


