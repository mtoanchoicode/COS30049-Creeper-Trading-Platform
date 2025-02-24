const express = require("express");
const { sendEmail } = require("../controllers/mail.controller.js");
const mailRouter = express.Router();

mailRouter.get("/", (req, res) => {
    return res.status(200).json("Success Get");
});

mailRouter.post("/subscribe", sendEmail); // call the sendEmail in the controller

module.exports = mailRouter; //export default