const Booking = require("../Repository/Booking");

const jwt = require('jsonwebtoken');
const secKey = "AWESOME";


exports.CreateAPI = async (req, res) => {
    let verfiTokens = async (req, res, next) => {
        try {
            let getToken = req.headers['authorization'];
            let revisedToken = getToken.split(' ')[1];
            let verified = jwt.verify(revisedToken, secKey);
            req.users = verified;
            next();
        } catch {
            res.status(401).send("Token invalid");
        }
    }

    try {
        await verfiTokens(req, res, async () => {
            req.body.User_Id = req.users[0]._id;
            await Booking.create(req.body);
            console.log("eror display")
            res.status(200).send("Created successfully");
        });
    } catch (err) {
        res.status(500).send("Server Error");
    }
};
//display the sucess message
exports.CreateAPI = async (req, res) => {
    try {
        await Booking.create(req.body);
        res.status(200).send("created sucessfulley")
    } catch (error) {
        throw error
    }
}

//get the all bookings by repository:
exports.AllUser = async (req, res) => {
    try {
        let Users = await Booking.getall();
        console.log(Users);
        return res.status(200).send(Users);
    } catch (error) {
        throw error
    }
}
//Delete the bookings flow by repository:
exports.Deleted = async (req, res) => {
    const delete_booking = await Booking.deleting(req.params.id);
    res.status(200).send("sucessfulley deleted");
}

//same as updating the bookings flow by repository:
exports.Updated = async (req, res) => {
    let id = req.params.id;
    const update_Booking = await Booking.Updating({ _id: id }, req.body);
    console.log(update_Booking);
    res.status(200).send(update_Booking);
}


