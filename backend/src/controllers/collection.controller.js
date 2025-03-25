const {createCollection, getCollection, getAllCollections} = require('../models/collection.model.js');

const createHandleCollection = async (req, res) => {
    const { contractAddress, ownerAddress, creatorAddress, collectionName, collectionSymbol, collectionDescription, collectionImage, totalSupply } = req.body;
    try{
        const transaction = await createCollection(contractAddress, ownerAddress, creatorAddress, collectionName, collectionSymbol, collectionDescription, collectionImage, totalSupply);
        res.status(201).json(transaction);
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
}

const getHandleCollection = async (req, res) => {
    const { contractAddress } = req.body;
    try{
        const collection = await getCollection(contractAddress);
        res.status(201).json(collection);
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
}

const getHandleAllCollections = async (req, res) => {
    try{
        const allCollections = await getAllCollections();
        res.status(200).json(allCollections);
    }
    catch(error){
        console.error("Error fetching collections:", error);
        res.status(500).json({error: error.message});
    }
}

module.exports = {
    createHandleCollection,
    getHandleCollection,
    getHandleAllCollections
};