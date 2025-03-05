require("dotenv").config();
const { ethers } = require("ethers");
const axios = require("axios");

const fetchTransactionHistory = async (walletAddress, isTransaction) => {
  const apiKey = process.env.ETHERSCAN_API_KEY;

  if (isTransaction) {
    // Fetch details for a specific transaction hash
    const url = `https://api-sepolia.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=${walletAddress}&apikey=${apiKey}`;

    try {
      const response = await axios.get(url);
      if (!response.data.result) {
        throw new Error("Transaction not found");
      }
      const tx = response.data.result;
      return {
        hash: tx.hash, // Transaction hash
        block: parseInt(tx.blockNumber, 16), // Convert block number from hex
        from: tx.from, // Sender address
        to: tx.to, // Receiver address
        amount: ethers.formatEther(tx.value), // Convert value from Wei to ETH
        fee: ethers.formatEther(BigInt(tx.gas) * BigInt(tx.gasPrice)), // Gas fee calculation
      };
    } catch (error) {
      console.error("Error fetching transaction:", error.message);
      return null;
    }
  } else {
    const url = `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&sort=desc&apikey=${apiKey}`;
    try {
      const response = await axios.get(url);

      if (!response.data.result || response.data.status !== "1") {
        throw new Error(
          response.data.message || "Failed to fetch wallet transactions"
        );
      }

      return response.data.result
        .slice(0, limit) // Take only the latest 'limit' transactions
        .map((tx) => ({
          hash: tx.hash,
          method: tx.functionName,
          block: tx.blockNumber,
          from: tx.from,
          to: tx.to,
          amount: ethers.formatEther(tx.value),
          fee: ethers.formatEther(BigInt(tx.gasUsed) * BigInt(tx.gasPrice)), // Fix gas fee calculation
          timestamp: new Date(tx.timeStamp * 1000).toLocaleString(),
        }));
    } catch (error) {
      console.error(
        "Error fetching transaction history for wallet address:",
        error.message
      );
      return []; // Return an empty array if the API call fails
    }
  }
};

module.exports = { fetchTransactionHistory };
