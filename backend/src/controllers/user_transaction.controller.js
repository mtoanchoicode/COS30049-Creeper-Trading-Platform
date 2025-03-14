const { createTransaction, getTransaction } = require("../models/user_transaction.model.js");
const { updateDepositBalance } = require("../models/deposit.model.js");

const createHandleTransaction = async (req, res) => {
    const { userID, tokenID, addressFrom, addressTo, amount, fee, gas, method, hashCode } = req.body;
    
    try {
        const transaction = await createTransaction(userID, tokenID, addressFrom, addressTo, amount, fee, gas, method, hashCode);

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
    const { userID, tokenID, addressFrom, addressTo, amount, fee, gas, method, hashCode } = req.body;

    try {
        const transaction = await getTransaction(hashCode);
        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = {
    createHandleTransaction,
    getHandleTransaction
};
