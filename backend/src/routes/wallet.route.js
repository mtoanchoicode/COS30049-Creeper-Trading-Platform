import { Router } from "express";
import { searchWallet, postWalletTransactions, getWalletGraph } from "../controllers/wallet.controller";
const walletRouter = Router();

walletRouter.get("/", (req, res) => {
  return res.status(200).json("Hello World API");
});

walletRouter.get("/:walletAddress", searchWallet);
walletRouter.post("/store-transactions/:walletAddress", postWalletTransactions); // Store transactions in DB
walletRouter.get("/wallet-graph/:walletAddress", getWalletGraph); // Retrieve and explore graph data

export default walletRouter; //export default
