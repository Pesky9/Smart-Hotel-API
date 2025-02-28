const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const GetAllUsers = async (req, res) => {
  try {
    const { role } = req.query;

    let users;
    if (role) {
      users = await User.findByRole(role);
      if (!users.length) {
        return res
          .status(404)
          .json({ message: `No users found with role: ${role}` });
      }
    } else {
      users = await User.findAll();
      if (!users.length) {
        return res.status(404).json({ message: "No users found." });
      }
    }

    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

const UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect Password." });
    }

    const payload = {
      id: user.id,
      uname: user.uname,
      email: user.email,
      urole: user.urole,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
      message: "Login successful.",
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

const UserSignup = async (req, res) => {
  try {
    const { uname, email, password, urole, phone_number } = req.body;

    if (!uname || !email || !password || !urole || !phone_number) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      uname,
      email,
      password_hash: hashedPassword,
      urole,
      phone_number,
    });

    const payload = {
      id: newUser.id,
      uname: newUser.uname,
      email: newUser.email,
      urole: newUser.urole,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.status(201).json({
      message: "User registered successfully.",
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

const UserBooking = (req, res) => {
  console.log("Booking");
};

module.exports = { GetAllUsers, UserLogin, UserSignup, UserBooking };
