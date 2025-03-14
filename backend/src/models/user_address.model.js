const CreeperDB = require("../config/CreeperDB.js");

const createUser = async (walletAddress) => {
    try {
        // Insert new user
        const { rows } = await CreeperDB.query(
            "INSERT INTO Users (WalletAddress) VALUES ($1) RETURNING *",
            [walletAddress]
        )
        return rows[0];
    } catch (err) {
        console.error('Error inserting user:', err);
    }

};

const getUserByWallet = async (walletAddress) => {
    try {
        const { rows } = await CreeperDB.query(
            "SELECT * FROM Users WHERE WalletAddress = $1",
            [walletAddress]
        )
        return rows[0];
    }
    catch (err) {
        console.error('Error getting user:', err);
    }

};

module.exports = { createUser, getUserByWallet };
