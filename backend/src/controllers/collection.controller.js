const {createCollection, getCollection, getAllCollections, getAllCollectionsForUser} = require('../models/collection.model.js');

const createHandleCollection = async (req, res) => {
    const { id, contractAddress, collectionName, collectionImage, price } = req.body;
    try{
        const transaction = await createCollection(id, contractAddress, collectionName, collectionImage, price);
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

const getHandleAllCollectionsForUser = async (req, res) => {
    try{
        const walletAddress = req.query.walletAddress
        if (!walletAddress){
            res.status(400).json({error: "Please connect to your wallet"});
        }
    
        const collectionsForUser = await getAllCollectionsForUser(walletAddress);
        if (!collectionsForUser){
            res.status(404).json({error: "Please create a collection first."});
        }
        res.status(201).json(collectionsForUser)
    }catch(error){
        console.error("Error getting collections for wallet address:", error)
        res.status(500).json({error: error.message});
    }
}

module.exports = {
    createHandleCollection,
    getHandleCollection,
    getHandleAllCollections,
    getHandleAllCollectionsForUser
};