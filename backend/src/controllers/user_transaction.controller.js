const { createTransaction, getTransaction, getAllTransactions } = require("../models/user_transaction.model.js");
const { updateDepositBalance } = require("../models/deposit.model.js");

const createHandleTransaction = async (req, res) => {
    const { userID, tokenID, addressFrom, addressTo, amount, fee, gas, method, hashCode, status } = req.body;
    try {
        const transaction = await createTransaction(userID, tokenID, addressFrom, addressTo, amount, fee, gas, method, hashCode, status);
        // If method is BUY, update deposit balance
        if (method === "BUY") {
            await updateDepositBalance(userID, amount, transaction.transactionid);
        }

        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getHandleTransaction = async(req, res) => {
    const { userID, tokenID, addressFrom, addressTo, amount, fee, gas, method, hashCode, status} = req.body;

    try {
        const transaction = await getTransaction(hashCode);
        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getHandleAllTransaction = async(req, res) => {
    try {
        const allTransactions = await getAllTransactions();
        res.status(200).json(allTransactions);
    } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createHandleTransaction,
    getHandleTransaction,
    getHandleAllTransaction
};
