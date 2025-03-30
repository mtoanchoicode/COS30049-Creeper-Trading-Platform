const {createNFTTransaction, getTransaction, getAllNFTTransactions} = require('../models/nft_transaction.model.js');

const createHandleNFTTransaction = async (req, res) => {
    const { ContractAddress, TokenID, AddressFrom, AddressTo, Fee, Gas, Method, HashCode, Status } = req.body;
    try{
        const nftTransaction = await createNFTTransaction(ContractAddress, TokenID, AddressFrom, AddressTo, Fee, Gas, Method, HashCode, Status);
        res.status(201).json(nftTransaction);
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
}

const getHandleNFTTransaction = async (req, res) => {
    const { HashCode } = req.body;
    try{
        const nftTransaction = await getTransaction(HashCode);
        res.status(201).json(nftTransaction);
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
}

const getHandleAllNFTTransactions = async (req, res) => {
    try{
        const allNFTTransactions = await getAllNFTTransactions();
        res.status(200).json(allNFTTransactions);
    }
    catch(error){
        console.error("Error fetching NFT Transactions:", error);
        res.status(500).json({error: error.message});
    }
}

module.exports = {
    createHandleNFTTransaction,
    getHandleNFTTransaction,
    getHandleAllNFTTransactions
};