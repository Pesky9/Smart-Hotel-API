const express = require("express");
const { SubmitForm } = require("../controllers/contact.controllers");

const contactRouter = express.Router();

contactRouter.post("/submit", SubmitForm);

module.exports = contactRouter;
