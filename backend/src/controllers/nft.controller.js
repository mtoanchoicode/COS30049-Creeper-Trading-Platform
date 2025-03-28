const {createNFT, getNFTFromCollection, getAllNFTsFromCollection} = require('../models/nft.model.js');

const createHandleNFT = async (req, res) => {
    const { TokenID, CollectionAddress, OwnerAddress, CreatorAddress, TokenName, TokenSymbol, TokenDescription, MetadataURI, ImageURI, Attributes } = req.body;
    try{
        const nft = await createNFT(TokenID, CollectionAddress, OwnerAddress, CreatorAddress, TokenName, TokenSymbol, TokenDescription, MetadataURI, ImageURI, Attributes);
        res.status(201).json(nft);
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
}

const getHandleNFT = async (req, res) => {
    const { ContractAddress, TokenID } = req.body;
    try{
        const nft = await getNFTFromCollection(ContractAddress, TokenID);
        res.status(201).json(nft);
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
}

const getHandleAllNFTsFromCollection = async (req, res) => {
    const { ContractAddress } = req.body;
    try{
        const allNFTs = await getAllNFTsFromCollection(ContractAddress);
        res.status(200).json(allNFTs);
    }
    catch(error){
        console.error("Error fetching NFTs:", error);
        res.status(500).json({error: error.message});
    }
}

module.exports = {
    createHandleNFT,
    getHandleNFT,
    getHandleAllNFTsFromCollection
};