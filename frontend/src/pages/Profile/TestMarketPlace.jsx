import { useState } from "react";
import { ethers } from "ethers";

const marketplaceAddress = "0xd9D32C0088A40794f57720135d6bF2582039d995";
const nftAddress = "0xE271105d10d7B20E79727DA1E1B73E26d5ee2E0f";
const nftAbi = ["function approve(address to, uint256 tokenId) external"];
const marketplaceAbi = [
  "function createMarketplaceItem(address nftContract, uint256 tokenId, uint256 price) external payable",
];

export default function ApproveAndListNFT() {
  const [loading, setLoading] = useState(false);

  const approveAndList = async () => {
    try {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();
      const tokenId = 2; // Replace with your NFT Token ID
      const price = ethers.parseEther("0.01"); // Replace with desired price
      const listingPrice = ethers.parseEther("0.001"); // Adjust listing price if needed

      // Get NFT contract
      const nftContract = new ethers.Contract(nftAddress, nftAbi, signer);
      // Approve marketplace contract to manage NFT
      let approveTx = await nftContract.approve(marketplaceAddress, tokenId);
      await approveTx.wait();
      console.log("Approval successful");

      // Get Marketplace contract
      const marketplaceContract = new ethers.Contract(
        marketplaceAddress,
        marketplaceAbi,
        signer
      );
      // Create marketplace item
      let listTx = await marketplaceContract.createMarketplaceItem(
        nftAddress,
        tokenId,
        price,
        { value: listingPrice }
      );
      await listTx.wait();
      console.log("NFT listed successfully");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={approveAndList} disabled={loading}>
      {loading ? "Processing..." : "Approve & List NFT"}
    </button>
  );
}
