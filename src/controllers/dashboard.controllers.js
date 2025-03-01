const Dashboard = require("../models/dashboard.model");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const sendMail = require("../config/mail");

// --------- BOOKINGS ---------
const getAllBookings = async (req, res) => {
  try {
    const rows = await Dashboard.findAllBookings();
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const createBooking = async (req, res) => {
  try {
    const { guest_id, checkin_date, checkout_date, bstatus } = req.body;
    const insertId = await Dashboard.createBooking({
      guest_id,
      checkin_date,
      checkout_date,
      bstatus,
    });
    res.json({
      success: true,
      message: "Booking created",
      bookingId: insertId,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updateBooking = async (req, res) => {
  try {
    const id = req.params.id;
    const { guest_id, checkin_date, checkout_date, bstatus } = req.body;
    const success = await Dashboard.updateBooking(id, {
      guest_id,
      checkin_date,
      checkout_date,
      bstatus,
    });
    if (success) {
      res.json({ success: true, message: "Booking updated" });
    } else {
      res.status(404).json({ success: false, message: "Booking not found" });
    }
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const id = req.params.id;
    const success = await Dashboard.deleteBooking(id);
    if (success) {
      res.json({ success: true, message: "Booking deleted" });
    } else {
      res.status(404).json({ success: false, message: "Booking not found" });
    }
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// --------- ROOMS ---------
const getAllRooms = async (req, res) => {
  try {
    const rows = await Dashboard.findAllRooms();
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const createRoom = async (req, res) => {
  try {
    const { rtype, price, rstatus } = req.body;
    const insertId = await Dashboard.createRoom({ rtype, price, rstatus });
    res.json({ success: true, message: "Room created", roomId: insertId });
  } catch (error) {
    console.error("Error creating room:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updateRoom = async (req, res) => {
  try {
    const id = req.params.id;
    const { rtype, price, rstatus } = req.body;
    const success = await Dashboard.updateRoom(id, { rtype, price, rstatus });
    if (success) {
      res.json({ success: true, message: "Room updated" });
    } else {
      res.status(404).json({ success: false, message: "Room not found" });
    }
  } catch (error) {
    console.error("Error updating room:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const deleteRoom = async (req, res) => {
  try {
    const id = req.params.id;
    const success = await Dashboard.deleteRoom(id);
    if (success) {
      res.json({ success: true, message: "Room deleted" });
    } else {
      res.status(404).json({ success: false, message: "Room not found" });
    }
  } catch (error) {
    console.error("Error deleting room:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// --------- USERS (Guests & Staff) ---------
const getAllGuests = async (req, res) => {
  try {
    const rows = await Dashboard.findAllGuests();
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Error fetching guests:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getAllStaffMembers = async (req, res) => {
  try {
    const rows = await Dashboard.findAllStaffMembers();
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Error fetching staff members:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const createUser = async (req, res) => {
  try {
    let { uname, email, phone_number, urole, dob } = req.body;
    console.log("Received:", req.body);

    // Validate required fields
    if (!uname || !email || !phone_number || !urole) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: uname, email, phone_number, and urole are required.",
      });
    }

    // Convert and validate phone_number
    phone_number = Number(phone_number);
    if (isNaN(phone_number) || phone_number.toString().length !== 10) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number. Must be a 10-digit number.",
      });
    }

    // Generate a temporary password if not provided
    const tempPassword = crypto.randomBytes(8).toString("hex");
    const password_hash = await bcrypt.hash(tempPassword, 10);

    // Log the data before inserting
    console.log("Creating user with:", {
      uname,
      email,
      phone_number,
      password_hash,
      urole,
      dob,
    });

    // Insert user into DB
    const insertId = await Dashboard.createUser({
      uname,
      email,
      phone_number,
      password_hash,
      urole,
      dob: dob || null,
      is_active: 1,
    });

    // Send email with temporary password
    const subject = "Welcome to GoFindStay - Your Staff Account Details";
    const html = `
      <h3>Hello ${uname},</h3>
      <p>Congratulations! You have been selected as a staff member at GoFindStay.</p>
      <p><strong>Your login details:</strong></p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Temporary Password:</strong> ${tempPassword}</p>
      <p><em>Note: Please log in and change your password immediately. Do NOT share this password with anyone.</em></p>
      <p>Regards,<br>GoFindStay Team</p>
    `;
    await sendMail(email, subject, html);

    res.json({
      success: true,
      message: "User created and email sent",
      userId: insertId,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { uname, email, password_hash, urole } = req.body;
    const success = await Dashboard.updateUser(id, {
      uname,
      email,
      password_hash,
      urole,
    });
    if (success) {
      res.json({ success: true, message: "User updated" });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const success = await Dashboard.deleteUser(id);
    if (success) {
      res.json({ success: true, message: "User deleted" });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
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
  // Users
  getAllGuests,
  getAllStaffMembers,
  createUser,
  updateUser,
  deleteUser,
};
