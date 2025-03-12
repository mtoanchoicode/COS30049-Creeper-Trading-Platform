require("dotenv").config();
const { ethers } = require("ethers");
const axios = require("axios");

const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_API_URL);

const fetchTransactionHistory = async (walletAddress, isTransaction) => {
  if (isTransaction) {
    // Fetch transaction details using eth_getTransactionByHash
    try {
      const tx = await provider.getTransaction(walletAddress);
      if (!tx) {
        throw new Error("Transaction not found");
      }
      return {
        hash: tx.hash,
        block: tx.blockNumber,
        from: tx.from,
        to: tx.to,
        amount: ethers.formatEther(tx.value), // Convert Wei to ETH
        fee: ethers.formatEther(tx.gasLimit * tx.gasPrice), // Gas fee calculation
      };
    } catch (error) {
      console.error("Error fetching transaction:", error.message);
      return null;
    }
  } else {
    let transactions = [];

    try {
      // Helper function to fetch transactions for a specific address type (fromAddress or toAddress)
      const fetchTransactions = async (addressType) => {
        let tempPageKey = null;
        let tempTransactions = [];

        do {
          const requestPayload = {
            jsonrpc: "2.0",
            id: 1,
            method: "alchemy_getAssetTransfers",
            params: [
              {
                fromBlock: "0x0",
                toBlock: "latest",
                [addressType]: walletAddress, // Fetch based on fromAddress OR toAddress
                category: ["external", "erc20", "erc721", "erc1155"],
                withMetadata: true,
                maxCount: "0x64",
              },
            ],
          };

          // Include pageKey only if we received one in the previous request
          if (tempPageKey) {
            requestPayload.params[0].pageKey = tempPageKey;
          }

          const response = await axios.post(
            process.env.ALCHEMY_API_URL,
            requestPayload
          );
          const result = response.data.result;

          if (!result || !result.transfers) {
            console.error(`No ${addressType} transaction data found.`);
            break;
          }

          tempTransactions.push(
            ...result.transfers.map((tx) => ({
              hash: tx.hash,
              block: tx.blockNum,
              from: tx.from,
              to: tx.to || "Contract Creation",
              amount: tx.value || "0",
              asset: tx.asset || "ETH",
              category: tx.category,
              fee: "N/A",
              timestamp: new Date(tx.metadata.blockTimestamp).toLocaleString(),
            }))
          );

          tempPageKey = result.pageKey || null; // Get next pageKey if available
        } while (tempPageKey); // Continue fetching until no more pages

        return tempTransactions;
      };

      // Fetch Sent Transactions (from walletAddress)
      const sentTransactions = await fetchTransactions("fromAddress");

      // Fetch Received Transactions (to walletAddress)
      const receivedTransactions = await fetchTransactions("toAddress");

      // Combine both lists and remove duplicates
      transactions = [...sentTransactions, ...receivedTransactions];

      // Sort transactions by block number (latest first)
      transactions.sort((a, b) => parseInt(b.block) - parseInt(a.block));

      return transactions;
    } catch (error) {
      console.error("Error fetching transactions:", error.message);
      return [];
    }
  }
};

module.exports = { fetchTransactionHistory };
