import { updateDepositBalance, getDeposit } from "../models/deposit.model.js";

export const createDeposit = async (req , res) => {
    const { userID, balance, transactionID } = req.body;

    try {
        const deposit = await updateDepositBalance(userID, balance, transactionID);
        res.status(201).json(deposit);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}; 


export const getDeposit = async (req , res) => {
    const { userID } = req.params;

    try {
        const deposit = await getDeposit(userID);
        res.status(200).json(deposit);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}; 
