const express = require("express");
const { createHandleNFTTransaction, getHandleNFTTransaction, getHandleAllNFTTransactions } = require("../controllers/nft_transaction.controller");
const NFTTransactionRouter = express.Router();

NFTTransactionRouter.get("/created", (req, res) => {
    return res.status(200).json("Success Get Created Collection");
});

NFTTransactionRouter.get("/", getHandleNFTTransaction)
NFTTransactionRouter.post("/created", createHandleNFTTransaction);
NFTTransactionRouter.get("/allNFTTransactions", getHandleAllNFTTransactions)

module.exports = NFTTransactionRouter;