const express = require("express");
const { getAddressNFT } = require("../controllers/nftSearch.controller");

const nftSearchRouter = express.Router();

nftSearchRouter.get("/", (req, res) => {
  return res.status(200).json("Hello NFTs");
});

nftSearchRouter.get("/:walletAddress", getAddressNFT);

module.exports = nftSearchRouter; //export default
