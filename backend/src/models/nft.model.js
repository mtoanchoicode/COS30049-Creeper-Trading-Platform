const { getUserByWallet} = require("../models/user_address.model.js");
const CreeperDB = require("../config/CreaperDB.js");

const createCollection = async (
    contractAddress, 
    ownerAddress, 
    creatorAddress, 
    collectionName, 
    collectionSymbol, 
    collectionDescription,  
    collectionImage,
    totalSupply
) => {
    try{
        const ownerUser = await getUserByWallet(ownerAddress);
        const ownerUID = ownerUser.UserID;

        const creatorUser = await getUserByWallet(creatorAddress);
        const creatorUID = creatorUser.UserID;

        const rows = await CreeperDB.sql`
        INSERT INTO "Collections" 
        ("ContractAddress", "OwnerAddress", "CreatorAddress", "CollectionName", "CollectionSymbol", "CollectionDescription", "CollectionImage", "TotalSupply")
        VALUES 
        (${contractAddress}::TEXT, ${ownerUID}, ${creatorUID}, ${collectionName}::TEXT, ${collectionSymbol}::TEXT, ${collectionDescription}::TEXT, ${collectionImage}::TEXT, ${totalSupply})
        RETURNING *;
        `
        return rows[0];
    } catch (error) {
        console.error('Error creating collection:', error);
    }
}

const getCollection = async (contractAddress) => {
    try{
        const rows = await CreeperDB.sql`
        SELECT * FROM "Collections"
        WHERE "ContractAddress" = ${contractAddress};
        `
        return rows[0];
    } catch (error) {
        console.error('Error getting collection:', error);
    }
}

module.exports = { createCollection, getCollection };