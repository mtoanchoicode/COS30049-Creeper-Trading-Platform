require("dotenv").config();
const { ethers } = require("ethers");
const axios = require("axios");

const fetchTokenHoldings = async (walletAddress) => {
  const apiKey = process.env.ETHERSCAN_API_KEY;
  const url = `https://api.etherscan.io/api?module=account&action=tokentx&address=${walletAddress}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`;

  try {
    const response = await axios.get(url);

    if (!response.data.result || response.data.status !== "1") {
      throw new Error(
        response.data.message || "Failed to fetch token transactions"
      );
    }

    // Process token balances
    const tokenBalances = {};

    response.data.result.forEach((tx) => {
      const tokenSymbol = tx.tokenSymbol;
      const tokenName = tx.tokenName;
      const decimals = parseInt(tx.tokenDecimal);
      const value = ethers.formatUnits(tx.value, decimals);

      if (!tokenBalances[tokenSymbol]) {
        tokenBalances[tokenSymbol] = {
          tokenName,
          symbol: tokenSymbol,
          balance: 0,
        };
      }

      // Add to balance if the wallet received tokens
      if (tx.to.toLowerCase() === walletAddress.toLowerCase()) {
        tokenBalances[tokenSymbol].balance += parseFloat(value);
      }

      // Subtract from balance if the wallet sent tokens
      if (tx.from.toLowerCase() === walletAddress.toLowerCase()) {
        tokenBalances[tokenSymbol].balance -= parseFloat(value);
      }
    });

    // Convert balances to an array and filter out zero balances
    return Object.values(tokenBalances).filter((token) => token.balance > 0);
  } catch (error) {
    console.error("Error fetching token holdings:", error.message);
    return [];
  }
};

module.exports = { fetchTokenHoldings };
