const CreeperDB = require("../config/CreeperDB.js");

const updateDepositBalance = async (userID, balance, transactionID) => {
    const query = `
        INSERT INTO Deposits (UserID, Balance, TransactionID)
        VALUES ($1, $2, $3) 
        ON CONFLICT (UserID) 
        DO UPDATE SET Balance = Deposits.Balance + EXCLUDED.Balance
        RETURNING *;
    `;

    try {
        const { rows } = await CreeperDB.query(query, [userID, balance, transactionID]);
        return rows[0];
    } catch (err) {
        console.log("Error updating or inserting deposit", err)
    }
};


const getDeposit = async (userID) => {
    const query = `
        SELECT * FROM Deposits 
        WHERE UserID = $1;
    `;
    try {
        const { rows } = await CreeperDB.query(query, [userID]);
        return rows[0];
    } catch (error) {
        console.error('Error getting deposit:', error);
        throw error;
    }
};

module.exports = { updateDepositBalance, getDeposit};