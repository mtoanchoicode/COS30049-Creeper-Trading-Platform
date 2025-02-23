const express = require("express");
const { sendEmail } = require("../controllers/mail.controller");
const mailRouter = express.Router();

mailRouter.post("/subscribe", sendEmail); // call the sendEmail in the controller

module.exports = mailRouter; //export default