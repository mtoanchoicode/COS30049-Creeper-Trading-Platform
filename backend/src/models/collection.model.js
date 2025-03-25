const { getUserByWallet} = require("./user_address.model.js");
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
        ("ContractAddress", "OwnerID", "CreatorID", "CollectionName", "CollectionSymbol", "CollectionDescription", "CollectionImage", "TotalSupply")
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

const getAllCollections = async () => {
    try{
        const rows = await CreeperDB.sql`
        SELECT 
            c."CollectionID",
            c."ContractAddress",
            c."OwnerID",
            o."WalletAddress" AS "OwnerAddress",  -- Fetching Owner's Wallet Address
            c."CollectionName",
            c."CollectionDescription",
            c."CollectionSymbol",
            c."TotalSupply",
            c."CreatedAt",
            c."TokenChain",
            u."WalletAddress" AS "CreatorAddress", -- Fetching Creator's Wallet Address
            c."CollectionImage"
        FROM "Collections" c
        LEFT JOIN "Users" o ON c."OwnerID" = o."UserID"  
        LEFT JOIN "Users" u ON c."CreatorID" = u."UserID" 
        ORDER BY c."CreatedAt" DESC; 
        `
        return rows;
    }catch(error){
        error.error("Error getting collections:", error);
        return [];
    }
}

module.exports = { createCollection, getCollection, getAllCollections };