const Room = require("../models/room.model");

const GetAllRooms = async (req, res) => {
  try {
    const { status } = req.query;

    let rooms;
    if (status) {
      rooms = await Room.findByStatus(status);
      if (!rooms.length) {
        return res
          .status(404)
          .json({ message: `No rooms found with status: ${status}` });
      }
    } else {
      rooms = await Room.findAll();
      if (!rooms.length) {
        return res.status(404).json({ message: "No rooms found." });
      }
    }

    res.status(200).json({ rooms });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = { GetAllRooms };
