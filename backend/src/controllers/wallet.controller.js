const TransactionModel = require("../models/transaction.model");
const { fetchETHBalance } = require("../utils/fetchETHBalance");
const { fetchTokenHoldings } = require("../utils/fetchTokenHoldings");
const { fetchTransactionHistory } = require("../utils/fetchTransactionHistory");

const searchWallet = async (req, res) => {
  var isTransaction = true;
  const walletAddress = req.params.walletAddress;
  walletInfo = {};
  walletInfo.walletAddress = walletAddress;
  if (!walletAddress) {
    return res.status(400).json({ error: "Address is required" });
  }

  const isAddress = /^0x[a-fA-F0-9]{40}$/.test(walletAddress);
  const isTxHash = /^0x[a-fA-F0-9]{64}$/.test(walletAddress);

  if (isAddress) {
    isTransaction = false;
    try {
      walletInfo.tokenHoldings = await fetchTokenHoldings(walletAddress);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
    try {
      walletInfo.ethBalance = await fetchETHBalance(walletAddress);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  try {
    walletInfo.transactionHistory = await fetchTransactionHistory(
      walletAddress,
      isTransaction
    );
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json(walletInfo);
};

const postWalletTransactions = async (req, res) => {
  const { walletAddress } = req.params;

  try {
    // 1. Fetch transactions first
    const transactions = await fetchTransactionHistory(walletAddress);

    // 2. Store each transaction in Neo4j
    for (const tx of transactions) {
      await TransactionModel.storeTransaction({
        from: tx.from,
        to: tx.to,
        amount: tx.amount, // Already formatted
        txHash: tx.hash, // Rename 'hash' to 'txHash'
        timestamp: tx.timestamp,
      });
    }

    res.status(201).json({ message: "Transactions stored successfully!" });
  } catch (error) {
    console.error("Error storing transactions:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const getWalletGraph = async (req, res) => {
  const { walletAddress } = req.params;

  try {
    // Fetch existing transactions from Neo4j
    let graphData = await TransactionModel.getTransactions(walletAddress);

    // Fetch latest transactions from Etherscan
    const latestTransactions = await fetchTransactionHistory(walletAddress);

    // Check if the wallet is missing or if there are new transactions
    if (
      graphData.length === 0 ||
      latestTransactions.some(
        (tx) => !graphData.some((storedTx) => storedTx.txHash === tx.hash)
      )
    ) {
      console.log(`Updating transactions for wallet: ${walletAddress}`);

      // Store missing transactions in Neo4j
      for (const tx of latestTransactions) {
        await TransactionModel.storeTransaction({
          from: tx.from,
          to: tx.to,
          amount: tx.amount,
          txHash: tx.hash,
          timestamp: tx.timestamp,
        });
      }

      // Fetch updated transactions from Neo4j
      graphData = await TransactionModel.getTransactions(walletAddress);
    }

    res.status(200).json({ transactions: graphData });
  } catch (error) {
    console.error("Error retrieving or updating graph data:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  searchWallet,
  postWalletTransactions,
  getWalletGraph,
};
