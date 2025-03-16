const CreeperDB = require("../config/CreaperDB.js");
const { getUserByWallet } = require("../models/user_address.model.js")
const { getTransaction } = require("../models/user_transaction.model.js")

const updateDepositBalance = async (userID, balance, transactionID, WalletAddress, transactionHash) => {

    try {
        const IdFromWallet = await getUserByWallet(WalletAddress)
        const uID = IdFromWallet.UserID

        const IdTransaction = await getTransaction(transactionHash)
        const tID = IdTransaction.TransactionID

        const rows = await CreeperDB.sql` 
        INSERT INTO "Deposits" ("UserID", "Balance", "TransactionID")
        VALUES (${uID}, ${balance}, ${tID}) 
        ON CONFLICT ("UserID") 
        DO UPDATE SET "Balance" = "Deposits.Balance" + "EXCLUDED.Balance"
        RETURNING *;`;
        return rows[0];
    } catch (err) {
        console.log("Error updating or inserting deposit", err)
    }
};


const getDeposit = async (userID) => {
    try {
        const rows = await CreeperDB.sql`   
        SELECT * FROM "Deposits" 
        WHERE "UserID" = ${userID};`;

        return rows[0];
    } catch (error) {
        console.error('Error getting deposit:', error);
        throw error;
    }
};

module.exports = { updateDepositBalance, getDeposit };