const express = require("express");
const multer = require("multer");
const NFTRouter = express.Router();
const { createNFTCollectionControll } = require("../controllers/collectionNFT.controller");

const upload = multer({ storage: multer.memoryStorage() });

NFTRouter.post("/deploy", upload.single("file"), createNFTCollectionControll);

NFTRouter.get("/", (req, res) => {
    return res.status(200).json("Success Get");
});

module.exports = NFTRouter;


