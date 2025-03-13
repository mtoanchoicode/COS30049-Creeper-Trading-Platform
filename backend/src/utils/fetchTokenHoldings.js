require("dotenv").config();
const { ethers } = require("ethers");
const axios = require("axios");

const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_API_URL);
const ALCHEMY_URL = process.env.ALCHEMY_API_URL;

const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function name() view returns (string)",
];

const fetchTokenHoldings = async (walletAddress) => {
  try {
    // Step 1: Get all token contract addresses from Alchemy
    const alchemyResponse = await axios.post(ALCHEMY_URL, {
      jsonrpc: "2.0",
      method: "alchemy_getTokenBalances",
      params: [walletAddress],
      id: 1,
    });

    const tokenContracts = alchemyResponse.data.result.tokenBalances
      .filter((token) => token.tokenBalance !== "0x0") // Exclude zero-balance tokens
      .map((token) => token.contractAddress);

    const tokenBalances = [];

    // Step 2: Fetch token details (symbol, name, decimals, balance)
    for (const tokenAddress of tokenContracts) {
      const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);

      const [rawBalance, decimals, symbol, name] = await Promise.all([
        contract.balanceOf(walletAddress),
        contract.decimals(),
        contract.symbol(),
        contract.name(),
      ]);

      const balance = ethers.formatUnits(rawBalance, decimals);

      if (parseFloat(balance) > 0) {
        tokenBalances.push({
          tokenName: name,
          symbol,
          balance: parseFloat(balance),
        });
      }
    }
    return tokenBalances;
  } catch (error) {
    console.error("Error fetching token balances:", error.message);
    return [];
  }
};

module.exports = { fetchTokenHoldings };
