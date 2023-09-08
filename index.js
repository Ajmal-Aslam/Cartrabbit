const express = require('express');
const app = express();

//for authentication and encrypted password use crypto-js:
const CryptoJS = require('crypto-js');

//for connecting one others datas use webtokens
const jwt = require('jsonwebtoken');
const bodyParser = require("body-parser");

//for upoading any images or files use multer
const multer = require('multer');


const mongoose = require('mongoose')
    .connect('mongodb+srv://Ajmal:7339055264@cluster0.ibcsg5s.mongodb.net/test')
    .then(() => {
        console.log('your DB is ready....')
    })

app.use(bodyParser.json());
app.listen(5000, () => {
    console.log("your port is ready.... ");
});



// Middleware
app.use(bodyParser.json());

//import controllers and repositories
const CustomerController = require("./Controller/Customer");
const HouseownerController = require("./Controller/Houseowner");
const PropertyController = require("./Controller/Property");
const RoomController = require("./Controller/Room");
const BookingController = require("./Controller/Booking");

console.log("controllers and repositories are imported")

// Customer Routes
app.post("/customer", CustomerController.createUser);
app.get("/customer", CustomerController.AllUser);
app.get("/customer/:id", CustomerController.OneUser);
app.delete("/customer/:id", CustomerController.Deleted);
app.put("/customer/:id", CustomerController.Updated);
app.post("/customer/login", CustomerController.login, CustomerController.generateToken);
app.put("/customer/:id/reset-password", CustomerController.resetPassword);

// Houseowner Routes
app.post("/houseowner", HouseownerController.createUser);
app.get("/houseowner", HouseownerController.AllUser);
app.delete("/houseowner/:id", HouseownerController.Deleted);
app.put("/houseowner/:id", HouseownerController.Updated);
app.post("/houseowner/login", HouseownerController.login, HouseownerController.generateToken);
app.put("/houseowner/:id/reset-password", HouseownerController.resetPassword);

// Property Routes
app.post("/property", PropertyController.CreateAPI);
app.get("/property", PropertyController.AllUser);
app.delete("/property/:id", PropertyController.Deleted);
app.put("/property/:id", PropertyController.Updated);

// Room Routes
app.post("/room", RoomController.createRoom);
app.get("/room", RoomController.getAllRooms);
app.delete("/room/:id", RoomController.deleteRoom);
app.put("/room/:id", RoomController.updateRoom);

// Booking Routes
app.post("/booking", BookingController.CreateAPI);
app.get("/booking", BookingController.AllUser);
app.delete("/booking/:id", BookingController.Deleted);
app.put("/booking/:id", BookingController.Updated);


