const http = require("http");
const express = require("express");
const dotenv = require("dotenv").config();
const userRouter = require("./src/routes/user.routes");
const db = require("./src/config/db");
const roomRouter = require("./src/routes/room.routes");
const contactRouter = require("./src/routes/contact.routes");

const app = express();

app.use(express.json());

http.createServer(app);
const PORT = 5000;

app.get("/", (req, res) => {
  res.send("API Running Successfully");
});

app.use("/api/v1/contact", contactRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/room", roomRouter);

db.getConnection()
  .then(() => {
    console.log("Connected to the database successfully.");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error.message);
    process.exit(1);
  });
