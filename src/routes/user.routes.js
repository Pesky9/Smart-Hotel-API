const express = require("express");
const {
  UserLogin,
  UserBooking,
  UserSignup,
  GetAllUsers,
} = require("../controllers/user.controllers");

const userRouter = express.Router();

userRouter.get("/all", GetAllUsers);
userRouter.post("/login", UserLogin);
userRouter.post("/signup", UserSignup);
userRouter.get("/book-room", UserBooking);

module.exports = userRouter;
