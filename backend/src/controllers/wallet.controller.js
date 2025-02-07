const { fetchETHBalance } = require("../utils/fetchETHBalance");
const { fetchTokenHoldings } = require("../utils/fetchTokenHoldings");
const { fetchTransactionHistory } = require("../utils/fetchTransactionHistory");

const searchWallet = async (req, res) => {
  const walletAddress = req.params.walletAddress;
  walletInfo = {};
  walletInfo.walletAddress = walletAddress;
  if (!walletAddress) {
    return res.status(400).json({ error: "Wallet address is required" });
  }

  try {
    walletInfo.ethBalance = await fetchETHBalance(walletAddress);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  try {
    walletInfo.transactionHistory = await fetchTransactionHistory(
      walletAddress
    );
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  try {
    walletInfo.tokenHoldings = await fetchTokenHoldings(walletAddress);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json(walletInfo);
};

module.exports = {
  searchWallet,
};
