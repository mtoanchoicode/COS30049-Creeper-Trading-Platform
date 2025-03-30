import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ethers } from "ethers";
import NFTCollectionBg from "./NFTCollectionBg/NFTCollectionBg";
import editDescIcon from "../../../assets/edit-description-icon.svg";
import "./NFTCollection.css";
import {
  uploadDescriptionToDB,
  getDescriptionFromDB,
} from "../../../utils/CollectionDetailsAPI";
import { ExportOutlined } from "@ant-design/icons";
import { use } from "react";

const NFTCollection = () => {
  const [nfts, setNfts] = useState([]);
  const [date, setDate] = useState("");
  const [lengths, setLengths] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const nft = location.state?.nft;

  const NFT_CONTRACT_ADDRESS = nft.address;
  const NFT_ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)", // Only available if contract implements it
    "function tokenURI(uint256 tokenId) view returns (string)",
    "function ownerOf(uint256 tokenId) view returns (address)",
    "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
  ]; // Replace with your deployed contract

  const fetchNFTsFromEvents = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(
        NFT_CONTRACT_ADDRESS,
        NFT_ABI,
        provider
      );

      const collectionName = await contract.name();
      const collectionAddress = NFT_CONTRACT_ADDRESS;

      // Fetch all Transfer events
      const transferEvents = await contract.queryFilter(
        "Transfer",
        0,
        "latest"
      );

      // Use a Map to store only the latest transfer per token
      const latestTransfers = new Map();

      transferEvents.forEach((event) => {
        const tokenId = event.args.tokenId.toString();
        latestTransfers.set(tokenId, event); // Always overwrite to keep only the latest
      });

      // Process only the latest transferred tokens
      const nftPromises = Array.from(latestTransfers.values()).map(
        async (event) => {
          try {
            const tokenId = event.args.tokenId.toString();
            const block = await provider.getBlock(event.blockNumber);

            const [tokenURI, owner] = await Promise.all([
              contract.tokenURI(tokenId),
              contract.ownerOf(tokenId),
            ]);

            // Ensure tokenURI is valid
            const validTokenURI = tokenURI.startsWith("ipfs://")
              ? tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/")
              : tokenURI;

            // Fetch metadata
            const metadataResponse = await fetch(validTokenURI);
            if (!metadataResponse.ok)
              throw new Error(`Invalid metadata for token ${tokenId}`);

            const metadata = await metadataResponse.json();
            const image = metadata.image
              ? metadata.image.replace("ipfs://", "https://ipfs.io/ipfs/")
              : "https://via.placeholder.com/200";

            return {
              id: tokenId,
              name: metadata.name || `Token #${tokenId}`,
              image,
              description: metadata.description || "No description available",
              collectionName,
              collectionAddress,
              lastUpdated: new Date(block.timestamp * 1000).toLocaleString(),
              owner,
            };
          } catch (error) {
            return null; // Ignore failed NFTs
          }
        }
      );

      // Wait for all NFT data
      const nftData = (await Promise.all(nftPromises)).filter(Boolean);

      return nftData;
    } catch (error) {
      return [];
    }
  };

  const getContractCreationDate = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);

      const tx = await provider.getCode(NFT_CONTRACT_ADDRESS);
      if (!tx) return "Unknown";

      const block = await provider.getBlock(tx.blockNumber);

      return new Date(block.timestamp * 1000).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      });
    } catch (error) {
      return "Unknown";
    }
  };

  const fetchNFTsCount = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(
        NFT_CONTRACT_ADDRESS,
        NFT_ABI,
        provider
      );

      // Fetch Transfer events
      const transferEvents = await contract.queryFilter(
        "Transfer",
        0,
        "latest"
      );

      // Count unique tokenIds
      const uniqueTokenIds = new Set(
        transferEvents.map((event) => event.args.tokenId.toString())
      );
      return uniqueTokenIds.size;
    } catch (error) {
      return 0;
    }
  };

  useEffect(() => {
    const fetchMetadata = async () => {
      setIsLoading(true);
      const totalNFTs = await fetchNFTsCount();
      setLengths(totalNFTs);
      const contractDate = await getContractCreationDate();
      setDate(contractDate);
      setIsLoading(false);
    };

    const fetchNFTsData = async () => {
      setIsLoading(true);
      const nftData = await fetchNFTsFromEvents();
      setNfts(nftData);
      setIsLoading(false);
    };

    fetchMetadata().then(() => fetchNFTsData()); // Ensure first fetch finishes before second
  }, []);

  const [expanded, setExpanded] = useState(false);
  const text =
    "A handcrafted collection of 10,000 characters developed by artist DirtyRobot. Each with their own identity to be discovered within the wider stories within RENGA. In its purest form, RENGA is the art of storytelling.";
  const toggleExpanded = () => setExpanded(!expanded);

  const [showEditDesc, setShowEditDesc] = useState(false);

  const toggleEditDescOverlay = () => {
    setShowEditDesc(!showEditDesc);
    if (showEditDesc) {
      document.body.style.overflow = "auto";
      setDescriptionToChange(description);
    } else {
      document.body.style.overflow = "hidden";
      setDescriptionToChange(description);
    }
  };
  const [description, setDescription] = useState(text || "");
  const [descriptionToChange, setDescriptionToChange] = useState(description);

  const handleChangeDescription = () => {
    setDescription(descriptionToChange);
    uploadDescriptionToDB(NFT_CONTRACT_ADDRESS, descriptionToChange);
    toggleEditDescOverlay();
  };

  useEffect(() => {
    const fetchDescription = async () => {
      try {
        const desc = await getDescriptionFromDB(NFT_CONTRACT_ADDRESS);
        setDescription(desc || "");
        setDescriptionToChange(desc || "");
      } catch (error) {
        console.error("Error fetching description:", error);
      }
    };

    fetchDescription();
  }, [NFT_CONTRACT_ADDRESS]);

  return (
    <div className="nft-collection">
      {showEditDesc && (
        <div className="nft-collection-description-overlay">
          <div className="nft-collection-set-description-container">
            <h2 className="nft-collection-set-description-header">
              Edit Description
            </h2>

            <textarea
              type="text"
              id="nft-collection-set-description-input"
              className="nft-collection-set-description-input"
              placeholder="Please enter a description"
              value={ descriptionToChange }
              onChange={(e) => setDescriptionToChange(e.target.value)}>
            </textarea>

            <div className="nft-collection-set-description-btns">
              <button
                className="nft-collection-set-description-btn-cancel"
                onClick={() => toggleEditDescOverlay()}
              >
                Cancel
              </button>
              <button
                className="nft-collection-set-description-btn-save"
                onClick={() => handleChangeDescription()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="nft-collection-header">
        <NFTCollectionBg contractAddress={NFT_CONTRACT_ADDRESS} />
        <div className="nft-collection-header-bottom">
          <div className="nft-collection-header-desc">
            {description.length > 70 ? (
              <div className="nft-collection-header-desc-text">
                {expanded ? description : `${description.substring(0, 70)}...`}{" "}
                <button onClick={toggleExpanded} className="see-more-btn">
                  {expanded ? "See Less" : "See More"}
                </button>
              </div>
            ) : (
              <div className="nft-collection-header-desc-text">
                {description}
              </div>
            )}

            {isLoading ? (
              <div className="nft-collection-header-desc-stat nft-skeleton"></div>
            ) : (
              <div className="nft-collection-header-desc-stat">
                <div>
                  <p>Items</p>
                  <p>{lengths}</p>
                </div>
                <div>
                  <p>Created</p>
                  <p>{date}</p>
                </div>
                <div>
                  <p>Chain</p>
                  <p>Sepolia</p>
                </div>
              </div>
            )}
          </div>
          <div className="nft-collection-header-btn">
            <img
              className="nft-collection-header-btn-editicon"
              onClick={() => toggleEditDescOverlay()}
              src={editDescIcon}
              alt="Edit description icon"
            />
            <a
              className="nft-collection-link"
              href={`https://sepolia.etherscan.io/address/${nft.address}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>View on EtherScan </span>
              <ExportOutlined />
            </a>
          </div>
        </div>
      </div>
      <div className="nft-collection-main">
        <div className="nft-collection-items">
          {isLoading ? (
            Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="nft-item nft-skeleton">
                <div className="nft-item-cover"></div>
                <div className="nft-item-desc">
                  <h3></h3>
                  <p></p>
                </div>
                <div className="nft-item-buy"></div>
              </div>
            ))
          ) : nfts.length > 0 ? (
            nfts.map((nft) => (
              <Link key={nft.id} to={`${nft.id}`} state={{ nft }}>
                <div className="nft-item">
                  <div className="nft-item-cover">
                    <img src={nft.image} alt={nft.name} />
                  </div>
                  <div className="nft-item-desc">
                    <h3>{`${nft.name}`}</h3>
                    <p>{nft.price ? nft.price : "Not listed"}</p>
                  </div>
                  <div className="nft-item-buy">
                    <p>Buy</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>No NFTs available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NFTCollection;
