const CreeperDB = require("../config/CreaperDB.js");

const insertToken = async (tokenName, tokenSymbol, tokenChain) => {
    const query = `
        INSERT INTO Tokens (TokenName, TokenSymbol, TokenChain) 
        VALUES ($1, $2, $3) 
        RETURNING *;
    `;
    
    try {
        const { rows } = await CreeperDB.query(query, [tokenName, tokenSymbol, tokenChain]);
        return rows[0];
    } catch (err) {
        console.error("Error inserting token: ", err);
    }
};

const getAllTokens = async () => {
    const query = `SELECT * FROM Tokens;`;
    
    try {
        const { rows } = await CreeperDB.query(query);
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
