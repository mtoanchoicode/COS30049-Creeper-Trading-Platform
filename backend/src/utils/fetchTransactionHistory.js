require("dotenv").config();
const { ethers } = require("ethers");
const axios = require("axios");

const fetchTransactionHistory = async (walletAddress, limit = 10) => {
  const apiKey = process.env.ETHERSCAN_API_KEY;
  const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&sort=desc&apikey=${apiKey}`;

  try {
    const response = await axios.get(url);

    if (!response.data.result || response.data.status !== "1") {
      throw new Error(response.data.message || "Failed to fetch transactions");
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
      }));
  } catch (error) {
    console.error("Error fetching transaction history:", error.message);
    return []; // Return an empty array if the API call fails
  }
};

module.exports = { fetchTransactionHistory };
