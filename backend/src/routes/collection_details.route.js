const express = require("express");
const { createHandleCollectionDetails, getHandleCollectionDetails, updateHandleCollectionImageURL, updateHandleCollectionDescription } = require("../controllers/collection_details.controller");
const CollectionDetailsRouter = express.Router();

CollectionDetailsRouter.get("/created", (req, res) => {
    return res.status(200).json("Success Get Created Collection Details");
});

CollectionDetailsRouter.get("/", getHandleCollectionDetails)
CollectionDetailsRouter.post("/created", createHandleCollectionDetails);
CollectionDetailsRouter.put("/updateImageURL", updateHandleCollectionImageURL);
CollectionDetailsRouter.put("/updateDescription", updateHandleCollectionDescription);

module.exports = CollectionDetailsRouter;