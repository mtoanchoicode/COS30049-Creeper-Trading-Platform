import CreeperDB from "../config/db.js";

export const createTransaction = async (userID, tokenID, addressFrom, addressTo, amount, fee, gas, method, hashCode) => {
    const query = `
        INSERT INTO Transactions (UserID, TokenID, AddressFrom, AddressTo, Amount, Fee, Gas, Method, HashCode, CreatedAt) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW()) 
        RETURNING *;
    `;
    try {
        const { rows } = await CreeperDB.query(query, [userID, tokenID, addressFrom, addressTo, amount, fee, gas, method, hashCode]);
        return rows[0];
    } catch (error) {
        console.error('Error creating transaction:', error);

    }
};

export const getTransaction = async (hashCode) => {
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