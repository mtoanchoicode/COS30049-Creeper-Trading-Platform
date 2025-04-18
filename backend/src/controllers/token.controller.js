const { insertToken, getAllTokens } = require("../models/token.model.js");


const createToken = async (req, res) => {
    const { tokenName, tokenSymbol, tokenChain } = req.body;
    try {
        const newToken = await insertToken(tokenName, tokenSymbol, tokenChain);
        res.status(201).json(newToken);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getToken = async (req, res) => {
    try {
        const tokens = await getAllTokens();
        res.status(200).json(tokens);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports = {
    createToken,
    getToken
};