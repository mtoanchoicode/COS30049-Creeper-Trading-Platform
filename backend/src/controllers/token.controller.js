import { insertToken, getAllTokens } from "../models/token.model.js";

export const createToken = async (req, res) => {
    const { tokenName, tokenSymbol, tokenChain } = req.body;
    try {
        const newToken = await insertToken(tokenName, tokenSymbol, tokenChain);
        res.status(201).json(newToken);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getToken = async (req, res) => {
    try {
        const tokens = await getAllTokens();
        res.status(200).json(tokens);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};