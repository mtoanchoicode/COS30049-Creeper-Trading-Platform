import { createUser, getUserByWallet } from "../models/user_address.model.js";

export const registerUser = async (req, res) => {
    // the walletAddress = request body 
    const { walletAddress } = req.body;

    try {
        let user = await getUserByWallet(walletAddress);
        if (!user) {
            user = await createUser(walletAddress);
        }
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};