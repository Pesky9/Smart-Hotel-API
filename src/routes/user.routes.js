const express = require("express");
const {
  UserLogin,
  UserBooking,
  UserSignup,
  GetAllUsers,
} = require("../controllers/user.controllers");
const authMiddleware = require("../middlewares/auth");

const userRouter = express.Router();

userRouter.get("/all", GetAllUsers);
userRouter.post("/login", UserLogin);
userRouter.post("/signup", UserSignup);
userRouter.get("/book-room", UserBooking);
userRouter.get("/verify", authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

module.exports = userRouter;
