const express = require("express");
const {
  searchWallet,
  postWalletTransactions,
  getWalletGraph,
} = require("../controllers/wallet.controller");
const walletRouter = express.Router();

walletRouter.get("/", (req, res) => {
  return res.status(200).json("Hello World API");
});

walletRouter.get("/:walletAddress", searchWallet);
walletRouter.post("/store-transactions/:walletAddress", postWalletTransactions); // Store transactions in DB
walletRouter.get("/wallet-graph/:walletAddress", getWalletGraph); // Retrieve and explore graph data


module.exports = walletRouter;
