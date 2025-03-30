const { getUserByWallet} = require("./user_address.model.js");
const { getNFTFromCollection } = require("./nft.model.js");

const createNFTTransaction = async (
    ContractAddress,
    TokenID,
    AddressFrom,
    AddressTo,
    Fee,
    Gas,
    Method,
    HashCode,
    Status
) => {
    try{
        const NFT = await getNFTFromCollection(ContractAddress, TokenID);
        const NFTID = NFT.NFTID;

        const fromUser = await getUserByWallet(AddressFrom);
        const fromUID = fromUser.UserID;

        const rows = await CreeperDB.sql`
        INSERT INTO "NFTTransactions" 
        ("UserID", "NFTID", "ContractAddress", "AddressFrom", "AddressTo", "Fee", "Gas", "Method", "CreatedAt", "HashCode", "Status")
        VALUES 
        (${fromUID}, ${NFTID}, ${ContractAddress}::TEXT, ${AddressFrom}::TEXT, ${AddressTo}::TEXT, ${Fee}, ${Gas}, ${Method}::TEXT, NOW(), ${HashCode}::TEXT, ${Status}::TEXT)
        RETURNING *;
        `
        return rows[0];
    } catch (error) {
        console.error('Error creating NFT Transaction:', error);
    }
}

const getTransaction = async (hashCode) => {
    try{
        const rows = await CreeperDB.sql`
        SELECT * FROM "NFTTransactions"
        WHERE "HashCode" = ${hashCode};
        `
        return rows[0];
    } catch (error) {
        console.error('Error getting NFT Transaction:', error);
    }
}

const getAllNFTTransactions = async () => {
    try{
        const rows = await CreeperDB.sql`
        SELECT * FROM "NFTTransactions";
        `
        return rows;
    } catch (error) {
        console.error('Error getting NFT Transactions:', error);
    }
}

module.exports = {
    createNFTTransaction,
    getTransaction,
    getAllNFTTransactions
}
