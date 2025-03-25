const express = require("express");
const { createHandleCollection, getHandleCollection, getHandleAllCollections } = require("../controllers/collection.controller");
const CollectionRouter = express.Router();

CollectionRouter.get("/created", (req, res) => {
    return res.status(200).json("Success Get Created Collection");
});

CollectionRouter.get("/", getHandleCollection)
CollectionRouter.post("/created", createHandleCollection);
CollectionRouter.get("/allCollections", getHandleAllCollections)

module.exports = CollectionRouter; 