const http = require("http");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config();
const userRouter = require("./src/routes/user.routes");
const db = require("./src/config/db");
const roomRouter = require("./src/routes/room.routes");
const contactRouter = require("./src/routes/contact.routes");
const DashboardRouter = require("./src/routes/dashboard.routes");
const cron = require("node-cron");
const couponModel = require("./src/models/coupon.model");

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, true);
    },
    credentials: true,
  })
);

http.createServer(app);
const PORT = 5000;

app.get("/", (req, res) => {
  res.send("API Running Successfully");
});

app.use("/api/v1/contact", contactRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/room", roomRouter);
// app.use("/api/v1/dashboard", DashboardRouter);

db.getConnection()
  .then(() => {
    console.log("Connected to the database successfully.");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    cron.schedule("0 8 * * *", async () => {
      console.log("Running birthday coupon cron job...");
      try {
        await couponModel.sendBirthdayCoupons();
        console.log("Birthday coupons sent successfully.");
      } catch (error) {
        console.error("Error sending birthday coupons:", error);
      }
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error.message);
    process.exit(1);
  });
