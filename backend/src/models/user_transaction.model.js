const { getUserByWallet } = require("../models/user_address.model.js")
const { getTokenIdFromAddress } = require("../models/token.model.js")
const CreeperDB = require("../config/CreaperDB.js");

const createTransaction = async (userID, tokenID, addressFrom, addressTo, amount, fee, gas, method, hashCode, status) => {

    try {
        const IdFromWallet = await getUserByWallet(addressFrom)
        const uID = IdFromWallet.UserID
        
        console.log(tokenID)
        const IdFromToken = await getTokenIdFromAddress(tokenID)
        console.log(IdFromToken)
        const tID = IdFromToken.TokenID
        console.log(tID)

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



const getAllTransactions = async () => {
    try{
        const rows = await CreeperDB.sql`
        SELECT 
        t."TransactionID",
        tok."TokenAddress",
        tok."TokenSymbol",
        t."AddressFrom",
        t."AddressTo",
        t."Amount",
        t."Fee",
        t."Gas",
        t."Method",
        t."CreatedAt",
        t."HashCode",
        t."Status"
        FROM "Transactions" t
        JOIN "Tokens" tok ON t."TokenID" = tok."TokenID";
        `
        return rows;
    }catch(error){
        console.error("Error getting transactions:", error)
        return []
    }
}
 
module.exports = { createTransaction, getTransaction, getAllTransactions };

