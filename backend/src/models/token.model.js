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

module.exports = { insertToken, getAllTokens };
