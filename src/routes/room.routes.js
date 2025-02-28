const express = require("express");
const { GetAllRooms } = require("../controllers/room.controllers");

const roomRouter = express.Router();

roomRouter.get("/all", GetAllRooms);

module.exports = roomRouter;
