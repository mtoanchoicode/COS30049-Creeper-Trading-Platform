const express = require("express");
const { searchWallet } = require("../controllers/wallet.controller");
const walletRouter = express.Router();

walletRouter.get("/", (req, res) => {
  return res.status(200).json("Hello World API");
});

walletRouter.get("/:walletAddress", searchWallet);

module.exports = walletRouter; //export default
