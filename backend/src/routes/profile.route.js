const express = require("express");
const {
  createUser,
  handleLogin,
  getUser,
  getAccount,
  forgotPassword,
  otpPassword,
  resetPassword,
  getWatchList,
  setWatchList,
} = require("../controllers/user.controller");
const auth = require("../middlewares/auth");

const profileRouter = express.Router();

profileRouter.all("*", auth);

profileRouter.get("/", (req, res) => {
  return res.status(200).json("Hello User");
});

profileRouter.post("/register", createUser);

profileRouter.post("/login", handleLogin);

profileRouter.get("/account", getAccount);

profileRouter.post("/forgot", forgotPassword);

profileRouter.post("/forgot/otp", otpPassword);

profileRouter.post("/forgot/reset", resetPassword);

profileRouter.get("/watch-list", getWatchList);

profileRouter.post("/watch-list", setWatchList);


module.exports = profileRouter;  //export default
