const express = require("express");
const { postAnwserChat } = require("../controllers/chat.controller");
const chatRouter = express.Router();

chatRouter.get("/hello", (req, res) => {
  return res.status(200).json("Hello CHATGPT API");
});

chatRouter.post("/", postAnwserChat);

module.exports = chatRouter; //export default
