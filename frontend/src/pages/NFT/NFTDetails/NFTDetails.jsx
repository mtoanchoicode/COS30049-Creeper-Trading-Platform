import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import "./NFTDetails.css";

import { Button, Input, Modal, notification, Tooltip } from "antd";
import { ethers } from "ethers";
import { SendOutlined } from "@ant-design/icons";
import { useAppKitAccount } from "@reown/appkit/react";

const NFTDetails = () => {
  const location = useLocation();
  const nft = location.state?.nft;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [buyLoading, setBuyLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [priceInput, setPriceInput] = useState("");
  const [isListed, setIsListed] = useState(false);
  const [listingPrice, setListingPrice] = useState(null);
  const [marketplaceItemId, setMarketplaceItemId] = useState(null);

  // For marketplace contract
  const marketplaceAddress = "0x96eBF50a52f224e80fc9CCbD2169321521316E7e";
  const nftAddress = nft.collectionAddress;
  const nftAbi = ["function approve(address to, uint256 tokenId) external"];
  const marketplaceAbi = [
    "function createMarketplaceItem(address nftContract, uint256 tokenId, uint256 price) external payable",
    "function createMarketplaceSale(address nftContract, uint256 itemId) external payable",
    "function fetchMarketplaceItems() public view returns (tuple(uint256 itemId, address nftContract, uint256 tokenId, address seller, address owner, uint256 price, bool sold)[] memory)",
  ];
  const tokenId = nft.id;
  const listingFee = ethers.parseEther("0.001");

  const handleListForSale = async () => {
    if (!priceInput || isNaN(priceInput) || Number(priceInput) <= 0) {
      notification.error({
        message: "Invalid Price",
        description: "Please enter a valid price.",
      });
      return;
    }

    if (!window.ethereum) {
      notification.error({
        message: "Wallet Required",
        description: "MetaMask or a compatible wallet is required!",
      });
      return;
    }

    setIsModalVisible(false);
    setLoading(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const nftContract = new ethers.Contract(nftAddress, nftAbi, signer);
      const marketplaceContract = new ethers.Contract(
        marketplaceAddress,
        marketplaceAbi,
        signer
      );

      const price = ethers.parseEther(priceInput);

      // Approve NFT for the marketplace
      const approveTx = await nftContract.approve(marketplaceAddress, tokenId);
      await approveTx.wait();
      notification.success({
        message: "NFT Approved",
        description: "Approval successful.",
      });

      // List NFT on the marketplace
      const listTx = await marketplaceContract.createMarketplaceItem(
        nftAddress,
        tokenId,
        price,
        { value: listingFee }
      );
      await listTx.wait();
      notification.success({
        message: "NFT Listed",
        description: `Transaction Hash: ${listTx.hash}`,
      });
      await checkIfListed();
    } catch (error) {
      notification.error({
        message: "Listing Fail",
        description: error.message,
      });
    } finally {
      setLoading(false);
      setPriceInput("");
    }
  };

  const checkIfListed = async () => {
    if (!window.ethereum) return;

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const marketplaceContract = new ethers.Contract(
        marketplaceAddress,
        marketplaceAbi,
        provider
      );

      // Get all unsold marketplace items
      const items = await marketplaceContract.fetchMarketplaceItems();

      // Find the item for this NFT
      const item = items.find(
        (item) =>
          item.nftContract.toLowerCase() === nftAddress.toLowerCase() &&
          item.tokenId.toString() === tokenId.toString()
      );

      if (item) {
        setIsListed(true);
        setListingPrice(item.price);
        setMarketplaceItemId(item.itemId);
      } else {
        setIsListed(false);
        setListingPrice(null);
        setMarketplaceItemId(null);
      }
    } catch (error) {
      console.error("Error checking if NFT is listed:", error);
      setIsListed(false);
      setListingPrice(null);
      setMarketplaceItemId(null);
    }
  };

  const handleBuyNFT = async () => {
    if (!window.ethereum) {
      notification.error({
        message: "Wallet Required",
        description: "MetaMask or a compatible wallet is required!",
      });
      return;
    }

    if (!marketplaceItemId) {
      notification.error({
        message: "Not Listed",
        description: "This NFT is not currently listed for sale.",
      });
      return;
    }

    setBuyLoading(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const marketplaceContract = new ethers.Contract(
        marketplaceAddress,
        marketplaceAbi,
        signer
      );

      // Buy the NFT by paying the listing price
      const buyTx = await marketplaceContract.createMarketplaceSale(
        nftAddress,
        marketplaceItemId,
        { value: listingPrice }
      );

      await buyTx.wait();

      notification.success({
        message: "Purchase Successful",
        description: `You have successfully purchased this NFT! Transaction Hash: ${buyTx.hash}`,
      });

      // Update NFT status after purchase
      await checkIfListed();
      // Update ownership status (you are now the owner)
      setOwner(true);
    } catch (error) {
      notification.error({
        message: "Purchase Failed",
        description: error.message,
      });
    } finally {
      setBuyLoading(false);
    }
  };

  // End marketplacce
  const { address } = useAppKitAccount();
  const [owner, setOwner] = useState(false);

  useEffect(() => {
    if (nft?.owner && address) {
      setOwner(nft.owner.toLowerCase() === address.toLowerCase());
    }

    // Check if the NFT is listed when component mounts
    checkIfListed();
  }, [nft?.owner, address, nftAddress, tokenId]);

  const shortenAddress = (ownerAddress) => {
    return ownerAddress.length > 13
      ? `${ownerAddress.slice(0, 6)}...${ownerAddress.slice(-4)}`
      : ownerAddress;
  };

  const calculateAge = (timestamp) => {
    const Timenow = new Date();
    const createdAt = new Date(timestamp);
    const diffMs = Timenow - createdAt;

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return `${seconds} sec ago`;
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hrs ago`;
    return `${days} days ago`;
  };

  const nftInformation = [
    { title: "Token ID", value: nft.id },
    { title: "Token Standard", value: "ERC-721" },
    {
      title: "Contract Address",
      value: (
        <a
          href={`https://sepolia.etherscan.io/address/${nft.collectionAddress}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#1890ff", textDecoration: "underline" }}
        >
          {shortenAddress(nft.collectionAddress)}
        </a>
      ),
    },
    { title: "Chain", value: "Sepolia" },
    { title: "Last Updated", value: calculateAge(nft.lastUpdated) },
    ...(isListed
      ? [
          {
            title: "Listing Price",
            value: `${ethers.formatEther(listingPrice)} ETH`,
          },
        ]
      : []),
  ];

  console.log(`isListed: ${isListed}`);

  return (
    <div className="nft-details">
      <div className="nft-details-bar">
        <div className="nft-details-bar-btns">
          <Button
            type="primary"
            flex
            className="back-btn"
            onClick={() => navigate(-1)}
          >
            <i className="fa-solid fa-arrow-left"></i> Back to collection
          </Button>
          {owner ? (
            <Button
              type="primary"
              className="list-btn"
              onClick={() => setIsModalVisible(true)}
              disabled={loading}
            >
              {loading ? "Listing..." : "List for sale"}
            </Button>
          ) : (
            ""
          )}
          {!owner && isListed ? (
            <Button
              type="primary"
              className="buy-btn"
              onClick={handleBuyNFT}
              disabled={buyLoading}
            >
              {buyLoading
                ? "Buying..."
                : `Buy for ${ethers.formatEther(listingPrice)} ETH`}
            </Button>
          ) : null}
        </div>
      </div>
      <Modal
        title="Enter Listing Price"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleListForSale}
      >
        <Input
          type="number"
          placeholder="Enter price in ETH"
          value={priceInput}
          onChange={(e) => setPriceInput(e.target.value)}
        />
      </Modal>
      <div className="nft-details-main">
        <div className="nft-details-left">
          <div className="nft-detials-left-container">
            <img src={nft.image} alt={nft.name} />
          </div>
        </div>
        <div className="nft-details-right">
          <div className="nft-details-right-top">
            <div className="nft-details-collection">
              <p className="collection-name">{nft.collectionName}</p>
              <h2 className="collection-item-name">{nft.name}</h2>
              <p className="collection-item-owner">
                Owned by{" "}
                <span>{owner ? "You" : shortenAddress(nft.owner)}</span>
              </p>
            </div>
            <div className="nft-details-icons">
              {owner ? (
                <Tooltip title="Transfer">
                  <Link
                    to={`/nft/${nft.collectionAddress}/${nft.id}/transfer`}
                    state={{ nft }}
                  >
                    <SendOutlined />
                  </Link>
                </Tooltip>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="nft-details-right-bottom">
            <div className="nft-details-desc">
              <h2>Description</h2>
              <p>{nft.description}</p>
            </div>
            <div className="nft-details-infos">
              <h2>Details</h2>
              {nftInformation.map(({ title, value }) => (
                <div className="nft-details-info" key={title}>
                  <p>{title}</p>
                  <p>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTDetails;
