const {createCollectionDetails, getCollectionDetails, updateCollectionImageURL, updateCollectionDescription} = require('../models/collection_details.model.js');

const createHandleCollectionDetails = async (req, res) => {
    const { contractAddress, collectionImage, collectionDescription } = req.body;
    try{
        const transaction = await createCollectionDetails(contractAddress, collectionImage, collectionDescription);
        res.status(201).json(transaction);
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
}

const getHandleCollectionDetails = async (req, res) => {
    try{
        const contractAddress = req.query.contractAddress;
        if(!contractAddress){
            res.status(400).json({error: "Contract address is required."});
        }

        const collectionDetails = await getCollectionDetails(contractAddress);
        if (!collectionDetails) {
            res.status(404).json({error: "Collection details not found."});
        }
        res.status(201).json(collectionDetails);
    }
    catch(error){
        console.error("Error getting collection details:", err);
        res.status(500).json({error: error.message});
    }
}

const updateHandleCollectionImageURL = async (req, res) => {
    const { contractAddress, collectionImage } = req.body;
    try{
        const transaction = await updateCollectionImageURL(contractAddress, collectionImage);
        res.status(201).json(transaction);
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
}

const updateHandleCollectionDescription = async (req, res) => {
    const { contractAddress, description } = req.body;
    try{
        const transaction = await updateCollectionDescription(contractAddress, description);
        res.status(201).json(transaction);
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
}

module.exports = {
    createHandleCollectionDetails,
    getHandleCollectionDetails,
    updateHandleCollectionImageURL,
    updateHandleCollectionDescription
};