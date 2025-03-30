const { getUserByWallet} = require("./user_address.model.js");
const CreeperDB = require("../config/CreaperDB.js");

const createCollection = async (
    id,
    contractAddress, 
    collectionName, 
    collectionImage,
    price
) => {
    try{
        const rows = await CreeperDB.sql`
        INSERT INTO "Collections" 
        ("ContractAddress", "ID", "CollectionName", "CollectionImage", "Price")
        VALUES 
        (${contractAddress}::TEXT, ${id}::TEXT, ${collectionName}::TEXT, ${collectionImage}::TEXT, ${price}::TEXT)
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
        SELECT * FROM "Collections"
        ORDER BY "Collections"."CreatedAt" DESC; 
        `
        return rows;
    }catch(error){
        error.error("Error getting collections:", error);
        return [];
    }
}

const getAllCollectionsForUser = async (walletAddress) => {
    try{
        const rows = await CreeperDB.sql`
        SELECT * FROM "Collections"
        ORDER BY "Collections"."CreatedAt" DESC; 
        `
        return rows;
    }catch(error){
        error.error("Error getting collections:", error);
        return [];
    }
}

module.exports = { createCollection, getCollection, getAllCollections, getAllCollectionsForUser };