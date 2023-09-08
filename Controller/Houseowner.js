const Houseowner = require("../Repository/Houseowner");
//crypto-js for encryptying the password
const CryptoJS = require("crypto-js");

//for generationg specific key token for the  data
const jwt = require("jsonwebtoken");

const secKey = "Awesome";

//created a sucess message with encrypted password:(signin)

exports.createUser = async (req, res) => {
    try {
        const { password } = req.body;
        const encryptData = CryptoJS.AES.encrypt(password, secKey).toString();
        req.body.password = encryptData;
        await Houseowner.create(req.body);
        res.status(200).send("created Successfully");
    } catch (error) {
        throw error;
    }
};

//get the Houseowner by some datas or propereties
exports.AllUser = async (req, res) => {
    try {
        let persons = await Houseowner.getall();
        console.log(persons);
        return res.status(200).send(persons);
    } catch (error) {
        throw error
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const loginUsers = await Houseowner.getUserByEmail(email);
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
        await Houseowner.resetPassword(id, password);
        res.status(200).send("Your password has been reset");
    } catch (error) {
        throw error;
    }
};
//delete the Houseowners
exports.Deleted = async (req, res) => {
    const delete_Houseowner = await Houseowner.deleting(req.params.id);
    res.status(200).send("sucessfulley deleted");
}


//updating the Houseowners bio:
exports.Updated = async (req, res) => {
    let id = req.params.id;
    const update_Houseowner = await Houseowner.Updating(id, req.body);
    console.log(update_Houseowner);
    res.status(200).send(update_Houseowner);
}


