const express = require("express");
const {
  UserLogin,
  UserBooking,
  UserSignup,
  GetAllUsers,
  UserSurvey,
  checkCoupon,
} = require("../controllers/user.controllers");
const authMiddleware = require("../middlewares/auth");

const userRouter = express.Router();

userRouter.get("/all", GetAllUsers);
userRouter.post("/login", UserLogin);
userRouter.post("/signup", UserSignup);
userRouter.post("/book-room", UserBooking);
userRouter.post("/survey", UserSurvey);
userRouter.get("/verify", authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

userRouter.post("/coupon", checkCoupon);

module.exports = userRouter;
