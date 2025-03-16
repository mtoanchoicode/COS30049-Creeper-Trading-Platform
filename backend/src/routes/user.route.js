const express = require("express");
const { registerUser } = require("../controllers/user_address.controller");
const userRouter = express.Router();


// add wallet address
userRouter.post("/register", registerUser);

module.exports = userRouter; //export default
