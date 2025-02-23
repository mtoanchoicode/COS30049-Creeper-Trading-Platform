const express = require("express");
const { createUser } = require("../controllers/user.controller");
const auth = require("../middlewares/auth");

const profileRouter = express.Router();

// profileRouter.all("*", auth);

profileRouter.get("/", (req, res) => {
  return res.status(200).json("Hello User");
});

profileRouter.post("/register", createUser);

module.exports = profileRouter; //export default
