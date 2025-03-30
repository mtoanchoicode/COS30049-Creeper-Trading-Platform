const CreeperDB = require("../config/CreaperDB.js");

const createCollectionDetails = async (
    contractAddress,
    collectionImage = null,
    collectionDescription = null
) => {
    try{
        const rows = await CreeperDB.sql`
        INSERT INTO "CollectionsDetails"
        ("ContractAddress", "BackgroundURL", "Description")
        VALUES
        (${contractAddress}::TEXT, ${collectionImage}::TEXT, ${collectionDescription}::TEXT)
        RETURNING *;
        `
        return rows[0];
    }catch (error) {
        console.error('Error creating collection details:', error);
    }
}

const getCollectionDetails = async (contractAddress) => {
    try{
        const rows = await CreeperDB.sql`
        SELECT * FROM "CollectionsDetails"
        WHERE "ContractAddress" = ${contractAddress};
        `
        return rows[0];
    } catch (error) {
        console.error('Error getting collection details:', error);
    }
}

const updateCollectionImageURL = async (contractAddress, collectionImage) => {
    try{
        let collection = await getCollectionDetails(contractAddress);
        if (!collection) {
            collection = await createCollectionDetails(contractAddress, collectionImage, null);
        }

        const rows = await CreeperDB.sql`
        UPDATE "CollectionsDetails"
        SET "BackgroundURL" = ${collectionImage}
        WHERE "ContractAddress" = ${contractAddress}
        RETURNING *;
        `
        return rows[0];
    } catch (error) {
        console.error('Error updating collection image URL:', error);
    }
}

const updateCollectionDescription = async (contractAddress, collectionDescription) => {
    try{
        let collection = await getCollectionDetails(contractAddress);
        if (!collection) {
            collection = await createCollectionDetails(contractAddress, null, collectionDescription);
        }

        const rows = await CreeperDB.sql`
        UPDATE "CollectionsDetails"
        SET "Description" = ${collectionDescription}
        WHERE "ContractAddress" = ${contractAddress}
        RETURNING *;
        `
        return rows[0];
    } catch (error) {
        console.error('Error updating collection description:', error);
    }
}

module.exports = {
    createCollectionDetails,
    getCollectionDetails,
    updateCollectionImageURL,
    updateCollectionDescription
}