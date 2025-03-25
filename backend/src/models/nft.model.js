const { getUserByWallet} = require("./user_address.model.js");
const { getCollectionByAddress, getCollection } = require("./collection.model.js");
const CreeperDB = require("../config/CreaperDB.js");

const createNFT = async (
    TokenID,
    CollectionAddress, // Contract Address
    OwnerAddress,
    CreatorAddress,
    TokenName,
    TokenSymbol,
    TokenDescription,
    MetadataURI,
    ImageURI,
    Attributes
) => {
    try{
        const ownerUser = await getUserByWallet(OwnerAddress);
        const ownerUID = ownerUser.UserID;

        const creatorUser = await getUserByWallet(CreatorAddress);
        const creatorUID = creatorUser.UserID;

        const collection = await getCollectionByAddress(CollectionAddress);
        const collectionID = collection.CollectionID;
        

        const rows = await CreeperDB.sql`
        INSERT INTO "NFTs" 
        ("TokenID", "CollectionID", "ContractAddress", "OwnerID", "CreatorID", "TokenName", "TokenSymbol", "TokenDescription", "MetadataURI", "ImageURI", "Attributes")
        VALUES 
        (${TokenID}, ${collectionID}, ${CollectionAddress}::TEXT, ${ownerUID}, ${creatorUID}, ${TokenName}::TEXT, ${TokenSymbol}::TEXT, ${TokenDescription}::TEXT, ${MetadataURI}::TEXT, ${ImageURI}::TEXT, ${Attributes})
        RETURNING *;
        `
        return rows[0];
    } catch (error) {
        console.error('Error creating NFT:', error);
    }
}

const getNFTFromCollection = async (ContractAddress, TokenID) => {
    try{
        const collection = await getCollectionByAddress(ContractAddress);
        const collectionID = collection.CollectionID;

        const rows = await CreeperDB.sql`
        SELECT * FROM "NFTs"
        WHERE "CollectionID" = ${collectionID} AND "TokenID" = ${TokenID};
        `
        return rows[0];
    } catch (error) {
        console.error('Error getting NFT:', error);
    }
}

const getAllNFTsFromCollection = async (ContractAddress) => {
    try{
        const collection = await getCollectionByAddress(ContractAddress);
        const collectionID = collection.CollectionID;

        const rows = await CreeperDB.sql`
        SELECT * FROM "NFTs"
        WHERE "CollectionID" = ${collectionID};
        `
        return rows;
    } catch (error) {
        console.error('Error getting NFTs:', error);
    }
}

module.exports = { createNFT, getNFTFromCollection, getAllNFTsFromCollection };