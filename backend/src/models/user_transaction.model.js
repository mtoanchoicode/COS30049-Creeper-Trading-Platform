const { getUserByWallet } = require("../models/user_address.model.js")
const { getTokenIdFromAddress } = require("../models/token.model.js")
const CreeperDB = require("../config/CreaperDB.js");

const createTransaction = async (userID, tokenID, addressFrom, addressTo, amount, fee, gas, method, hashCode, status) => {
    // const query = `
    //     INSERT INTO Transactions (UserID, TokenID, AddressFrom, AddressTo, Amount, Fee, Gas, Method, CreatedAt, HashCode, Status) 
    //     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), $9, $10) 
    //     RETURNING *;
    // `;
    try {
        const IdFromWallet = await getUserByWallet(addressFrom)
        const uID = IdFromWallet.UserID

        const IdFromToken = await getTokenIdFromAddress(tokenID)
        const tID = IdFromToken.TokenID
        console.log(IdFromToken)
        console.log(tID)

        console.log("userID:", uID);
        console.log("tokenID:", tID);
        console.log("addressFrom:", addressFrom);
        console.log("addressTo:", addressTo);
        console.log("amount:", amount);
        console.log("fee:", fee);
        console.log("gas:", gas);
        console.log("method:", method);
        console.log("hashCode:", hashCode);
        console.log("status:", status);

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
    // const query = `
    //     SELECT * FROM Transactions 
    //     WHERE hashCode = $1;
    // `;

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