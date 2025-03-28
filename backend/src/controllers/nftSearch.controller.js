const express = require("express");
const axios = require("axios");

const getAddressNFT = async (req, res) => {
  const ALCHEMY_API_URL = process.env.ALCHEMY_API_URL;
  const { walletAddress } = req.params;

  if (!walletAddress) {
    return res.status(400).json({ error: "Wallet address is required" });
  }

  try {
    // Fetch NFTs owned by the address
    const response = await axios.get(
      `${ALCHEMY_API_URL}/getNFTs/?owner=${walletAddress}&contractAddresses=[]`
    );

    const nfts = await Promise.all(
      response.data.ownedNfts.map(async (nft) => {
        return {
          name: nft.metadata.name || "Unknown NFT",
          symbol: nft.metadata.symbol || "Unknown NFT",
          collection: nft.contractMetadata,
          image: nft.metadata.image || "https://via.placeholder.com/150",
          contractAddress: nft.contract.address,
          tokenId: nft.id.tokenId,
          balance: nft.balance,
          description: nft.metadata.description || "No description available",
        };
      })
    );

    res.json({ nfts });
  } catch (error) {
    console.error("Error fetching NFTs:", error);
    res.status(500).json({ error: "Failed to fetch NFTs" });
  }
};

module.exports = {
  getAddressNFT,
};
