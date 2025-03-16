const CreeperDB = require("../config/CreaperDB.js");

const createTransaction = async (userID, tokenID, addressFrom, addressTo, amount, fee, gas, method, hashCode, status) => {
    const query = `
        INSERT INTO Transactions (UserID, TokenID, AddressFrom, AddressTo, Amount, Fee, Gas, Method, CreatedAt, HashCode, Status) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), $9, $10) 
        RETURNING *;
    `;
    try {
        const { rows } = await CreeperDB.query(query, [userID, tokenID, addressFrom, addressTo, amount, fee, gas, method, hashCode, status]);
        return rows[0];
    } catch (error) {
        console.error('Error creating transaction:', error);

    }
};

const getTransaction = async (hashCode) => {
    const query = `
        SELECT * FROM Transactions 
        WHERE hashCode = $1;
    `;

    try {
        const { rows } = await CreeperDB.query(query, [hashCode]);
        return rows[0];
    } catch (error) {
        console.error('Error getting transaction:', error);
    }
};

module.exports = { createTransaction, getTransaction };