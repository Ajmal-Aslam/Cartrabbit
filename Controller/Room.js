const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

const Room = require("../Repository/Room");

// Create a new room
exports.createRoom = async (req, res) => {
    try {
        const { name, property, RoomSize, beds, rentAmount } = req.body;
        const room = new Room({
            name,
            property,
            RoomSize,
            beds,
            rentAmount,
            photos: req.files.map(file => file.path)
        });
        await room.save();
        //can give specific error .json
        res.status(201).json({ message: 'Room created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create room' });
    }
};

// Get all rooms
exports.getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find().populate('property');
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch rooms' });
    }
};

// Delete a room
exports.deleteRoom = async (req, res) => {
    try {
        const { id } = req.params;
        await Room.findByIdAndDelete(id);
        res.json({ message: 'Room deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete room' });
    }
};

// Update a room
exports.updateRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const room = await Room.findByIdAndUpdate(id, req.body);
        res.json({ message: 'Room updated successfully', room });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update room' });
    }
};
