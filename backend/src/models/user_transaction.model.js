const { getUserByWallet } = require("../models/user_address.model.js")
const { getTokenIdFromAddress } = require("../models/token.model.js")
const CreeperDB = require("../config/CreaperDB.js");

const createTransaction = async (userID, tokenID, addressFrom, addressTo, amount, fee, gas, method, hashCode, status) => {

    try {
        const IdFromWallet = await getUserByWallet(addressFrom)
        const uID = IdFromWallet.UserID

        const IdFromToken = await getTokenIdFromAddress(tokenID)
        const tID = IdFromToken.TokenID

        const  rows  = await CreeperDB.sql`
        INSERT INTO "Transactions" 
        ("UserID", "TokenID", "AddressFrom", "AddressTo", "Amount", "Fee", "Gas", "Method", "CreatedAt", "HashCode", "Status") 
        VALUES (${uID}, ${tID}, ${addressFrom}::TEXT, ${addressTo}::TEXT, ${amount}, ${fee}, ${gas}, ${method}::TEXT, NOW(), ${hashCode}::TEXT, ${status}::TEXT)
        RETURNING *;
    `;
        return rows[0];
    } catch (error) {
        console.error('Error creating transaction:', error);
    }
};

const getTransaction = async (hashCode) => {

    try {
        const rows = await CreeperDB.sql`
        SELECT * FROM "Transactions" 
        WHERE "HashCode" = ${hashCode};
    `;
        return rows[0];
    } catch (error) {
        console.error('Error getting transaction:', error);
    }
};





module.exports = { createTransaction, getTransaction };
