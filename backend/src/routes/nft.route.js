const express = require("express");
const { createHandleNFT, getHandleNFT, getHandleAllNFTsFromCollection } = require("../controllers/nft.controller");
const NFTRouter = express.Router();

NFTRouter.get("/created", (req, res) => {
    return res.status(200).json("Success Get Created Collection");
});

NFTRouter.get("/", getHandleNFT)
NFTRouter.post("/created", createHandleNFT);
NFTRouter.get("/allNFTsFromCollection", getHandleAllNFTsFromCollection)

module.exports = NFTRouter;