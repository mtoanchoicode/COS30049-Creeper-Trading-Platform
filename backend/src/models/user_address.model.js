const CreeperDB = require("../config/CreaperDB.js");

const createUser = async (walletAddress) => {
    try {
        // Insert new user
        const rows = await CreeperDB.sql`
        INSERT INTO "Users" ("WalletAddress") VALUES (${walletAddress}) RETURNING *;
    `;
        if (!rows || rows.length === 0) {
            console.log('User creation failed: No data returned');
        }else{
            return rows[0]; // First row of the result
        }

    } catch (err) {
        console.error('Error inserting user:', err);
    }

};

const getUserByWallet = async (walletAddress) => {
    walletAddress = walletAddress.trim();
    try {
        const rows  = await CreeperDB.sql`
        SELECT * FROM "Users" WHERE "WalletAddress" = ${walletAddress.toLowerCase()} LIMIT 1;
    `;
        if (!rows || rows.length === 0) {
            return null;
        }
        return rows[0]; // First row of the result
    }
    catch (err) {
        console.error('Error getting user:', err);
    }

};

module.exports = { createUser, getUserByWallet };
