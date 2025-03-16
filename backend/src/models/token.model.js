const CreeperDB = require("../config/CreaperDB.js");

const insertToken = async (tokenName, tokenSymbol, tokenChain) => {
    
    try {
        const rows = await CreeperDB.sql` 
        INSERT INTO "Tokens" ("TokenName", "TokenSymbol", "TokenChain") 
        VALUES (${tokenName}, ${tokenSymbol}, ${tokenChain}) 
        RETURNING *;
        `
        return rows[0];
    } catch (err) {
        console.error("Error inserting token: ", err);
    }
};

const getAllTokens = async () => {
   

    try {
        const rows = await CreeperDB.sql`SELECT * FROM "Tokens";`;
        return rows;
    } catch (err) {
        console.log("Error getting all token: ", err)
    }

};

const getTokenIdFromAddress = async (tokenAddress) => {
    tokenAddress = tokenAddress.trim();
    try {
        const rows = await CreeperDB.sql`
        SELECT * FROM "Tokens" WHERE "TokenAddress" = ${tokenAddress.toLowerCase()} LIMIT 1;
    `;
        if (!rows || rows.length === 0) {
            return null;
        }
        console.log(rows[0]);
        return rows[0]; // First row of the result
    }
    catch (err) {
        console.error('Error getting token:', err);
    }
};

module.exports = { insertToken, getAllTokens, getTokenIdFromAddress };
