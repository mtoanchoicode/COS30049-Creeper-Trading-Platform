const { ethers } = require("ethers");
require("dotenv").config();

// Initialize Ethereum provider
const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_API_URL);

const fetchETHBalance = async (walletAddress) => {
  try {
    const balance = await provider.getBalance(walletAddress);
    return ethers.formatEther(balance);
  } catch (error) {
    console.log("Error fetching ETH balance:", error);
    throw new Error("Failed to fetch ETH balance");
  }
};

module.exports = { fetchETHBalance };
