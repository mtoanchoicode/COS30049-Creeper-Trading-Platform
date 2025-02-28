const express = require("express");
const {
  createUser,
  handleLogin,
  getUser,
  getAccount,
  forgotPassword,
  otpPassword,
  resetPassword,
} = require("../controllers/user.controller");
const auth = require("../middlewares/auth");

const profileRouter = express.Router();

profileRouter.all("*", auth);

profileRouter.get("/", (req, res) => {
  return res.status(200).json("Hello User");
});

profileRouter.post("/register", createUser);

profileRouter.post("/login", handleLogin);

profileRouter.get("/user", getUser);

profileRouter.get("/account", getAccount);

profileRouter.post("/forgot", forgotPassword);

profileRouter.post("/forgot/otp", otpPassword);

profileRouter.post("/forgot/reset", resetPassword);

module.exports = profileRouter; //export default
