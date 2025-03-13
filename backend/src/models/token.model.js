import CreeperDB from "../config/db.js";

export const insertToken = async (tokenName, tokenSymbol, tokenChain) => {
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

export const getAllTokens = async () => {
    const query = `SELECT * FROM Tokens;`;
    
    try {
        const { rows } = await CreeperDB.query(query);
        return rows;
    } catch (err) {
        console.log("Error getting all token: ", err)
    }
};

