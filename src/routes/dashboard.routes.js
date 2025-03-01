const express = require("express");
const {
  // Bookings
  getAllBookings,
  createBooking,
  updateBooking,
  deleteBooking,
  // Rooms
  getAllRooms,
  createRoom,
  updateRoom,
  deleteRoom,
  // Users (Guests & Staff)
  getAllGuests,
  getAllStaffMembers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/dashboard.controllers");

const DashboardRouter = express.Router();

// ----- BOOKINGS ROUTES -----
DashboardRouter.get("/bookings/all", getAllBookings);
DashboardRouter.post("/bookings/add", createBooking);
DashboardRouter.put("/bookings/:id", updateBooking);
DashboardRouter.delete("/bookings/:id", deleteBooking);

// ----- ROOMS ROUTES -----
DashboardRouter.get("/rooms/all", getAllRooms);
DashboardRouter.post("/rooms/add", createRoom);
DashboardRouter.put("/rooms/:id", updateRoom);
DashboardRouter.delete("/rooms/:id", deleteRoom);

// ----- USERS ROUTES -----
DashboardRouter.get("/guests/all", getAllGuests);
DashboardRouter.get("/staff/all", getAllStaffMembers);
DashboardRouter.post("/users/add", createUser);
DashboardRouter.put("/users/:id", updateUser);
DashboardRouter.delete("/users/:id", deleteUser);

module.exports = DashboardRouter;
