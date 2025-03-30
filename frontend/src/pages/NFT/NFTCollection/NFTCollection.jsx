import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ethers } from "ethers";
import NFTCollectionBg from "./NFTCollectionBg/NFTCollectionBg";
import editDescIcon from "../../../assets/edit-description-icon.svg"
import "./NFTCollection.css";
import {uploadDescriptionToDB, getDescriptionFromDB} from "../../../utils/CollectionDetailsAPI";
import { ExportOutlined } from "@ant-design/icons";

const NFTCollection = () => {
  const [nfts, setNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const nft = location.state?.nft;

  const NFT_CONTRACT_ADDRESS = nft.address;
  const NFT_ABI = [
    {
      inputs: [
        { internalType: "string", name: "_collectionName", type: "string" },
        { internalType: "string", name: "_symbol", type: "string" },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [
        { internalType: "address", name: "sender", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" },
        { internalType: "address", name: "owner", type: "address" },
      ],
      name: "ERC721IncorrectOwner",
      type: "error",
    },
    {
      inputs: [
        { internalType: "address", name: "operator", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" },
      ],
      name: "ERC721InsufficientApproval",
      type: "error",
    },
    {
      inputs: [{ internalType: "address", name: "approver", type: "address" }],
      name: "ERC721InvalidApprover",
      type: "error",
    },
    {
      inputs: [{ internalType: "address", name: "operator", type: "address" }],
      name: "ERC721InvalidOperator",
      type: "error",
    },
    {
      inputs: [{ internalType: "address", name: "owner", type: "address" }],
      name: "ERC721InvalidOwner",
      type: "error",
    },
    {
      inputs: [{ internalType: "address", name: "receiver", type: "address" }],
      name: "ERC721InvalidReceiver",
      type: "error",
    },
    {
      inputs: [{ internalType: "address", name: "sender", type: "address" }],
      name: "ERC721InvalidSender",
      type: "error",
    },
    {
      inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
      name: "ERC721NonexistentToken",
      type: "error",
    },
    {
      inputs: [{ internalType: "address", name: "owner", type: "address" }],
      name: "OwnableInvalidOwner",
      type: "error",
    },
    {
      inputs: [{ internalType: "address", name: "account", type: "address" }],
      name: "OwnableUnauthorizedAccount",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "approved",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          indexed: false,
          internalType: "bool",
          name: "approved",
          type: "bool",
        },
      ],
      name: "ApprovalForAll",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        { indexed: true, internalType: "address", name: "to", type: "address" },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" },
      ],
      name: "approve",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "owner", type: "address" }],
      name: "balanceOf",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "amount", type: "uint256" },
        { internalType: "string[]", name: "metadataURIs", type: "string[]" },
      ],
      name: "batchMint",
      outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "getAllMintedTokens",
      outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
      name: "getApproved",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getListedNFTs",
      outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "address", name: "operator", type: "address" },
      ],
      name: "isApprovedForAll",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
      name: "listNFT",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "string", name: "metadataURI", type: "string" }],
      name: "mint",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
      name: "ownerOf",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" },
        { internalType: "bytes", name: "data", type: "bytes" },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "operator", type: "address" },
        { internalType: "bool", name: "approved", type: "bool" },
      ],
      name: "setApprovalForAll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
      name: "supportsInterface",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
      name: "tokenURI",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" },
      ],
      name: "transferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
      name: "unlistNFT",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ]; // Replace with your deployed contract

  const getContractCreationDate = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const txReceipt = await provider.getTransactionReceipt(
        NFT_CONTRACT_ADDRESS
      );

      if (!txReceipt) {
        console.log("Transaction receipt not found.");
        return;
      }

      const block = await provider.getBlock(txReceipt.blockNumber);
      console.log(
        "Contract Creation Date (UTC):",
        new Date(block.timestamp * 1000).toISOString()
      );
    } catch (error) {
      console.error("Error fetching contract creation date:", error);
    }
  };

  const getNFTs = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(
        NFT_CONTRACT_ADDRESS,
        NFT_ABI,
        provider
      );

      const tokenIds = await contract.getAllMintedTokens(); // Fetch array of minted token IDs
      const nftData = [];

      for (const tokenId of tokenIds) {
        const tokenURI = await contract.tokenURI(tokenId); // Fetch metadata URI
        const metadataResponse = await fetch(
          tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/")
        ); // Convert IPFS URI to HTTP
        const metadata = await metadataResponse.json();

        nftData.push({
          id: tokenId,
          name: metadata.name,
          image: metadata.image.replace("ipfs://", "https://ipfs.io/ipfs/"),
          description: metadata.description,
        });
      }

      return nftData;
    } catch (error) {
      console.error("Error fetching NFTs:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchNFTs = async () => {
      setIsLoading(true);
      await getContractCreationDate();
      const data = await getNFTs();
      setNfts(data);
      setIsLoading(false);
    };
    fetchNFTs();
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
    } else {
      document.body.style.overflow = "hidden";
    }
  }
  const [description, setDescription] = useState(text || "");
  const [descriptionToChange, setDescriptionToChange] = useState(description);

  const handleChangeDescription = () => {
    setDescription(descriptionToChange);
    uploadDescriptionToDB(NFT_CONTRACT_ADDRESS, descriptionToChange);
    toggleEditDescOverlay();
  }

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
  }, [NFT_CONTRACT_ADDRESS])

  return (
    <div className="nft-collection">
      {showEditDesc && (
        <div className="nft-collection-description-overlay">
          <div className="nft-collection-set-description-container">
            <h2 className="nft-collection-set-description-header">Edit Description</h2>
            
            <textarea
              type="text"
              id="nft-collection-set-description-input"
              className="nft-collection-set-description-input"
              value={ descriptionToChange || "Enter a new description for your collection"}
              onChange={(e) => setDescriptionToChange(e.target.value)}>
            </textarea>
            <div className="nft-collection-set-description-btns">
              <button className="nft-collection-set-description-btn-cancel" onClick={() => toggleEditDescOverlay()}>Cancel</button>
              <button className="nft-collection-set-description-btn-save" onClick={() => handleChangeDescription()}>Save</button>
            </div>
          </div>
        </div>
      )}
      
      <div className="nft-collection-header">
        <NFTCollectionBg contractAddress={NFT_CONTRACT_ADDRESS}/>
        <div className="nft-collection-header-bottom">
          <div className="nft-collection-header-desc">
            {description.length > 70 ? (
              <div className="nft-collection-header-desc-text">
              {expanded ? description : `${description.substring(0, 70)}...`}{" "}
              <button onClick={toggleExpanded} className="see-more-btn">
                {expanded ? "See Less" : "See More"}
              </button>
            </div>
            ):
              <div className="nft-collection-header-desc-text">
                {description}
              </div>
            }
            
            <div className="nft-collection-header-desc-stat">
              <div>
                <p>Items</p>
                <p>9</p>
              </div>
              <div>
                <p>Created</p>
                <p>March 2025</p>
              </div>
              <div>
                <p>Chain</p>
                <p>Sepolia</p>
              </div>
            </div>
          </div>
          <div className="nft-collection-header-btn">
          <img className="nft-collection-header-btn-editicon" onClick={() => toggleEditDescOverlay()} src={editDescIcon} alt="Edit description icon" />
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
              <div key={index} className="nft-item nft-skeleton"></div>
            ))
          ) : nfts.length > 0 ? (
            nfts.map((nft) => (
              <Link key={nft.id} to={`${nft.id}`}>
                <div className="nft-item">
                  <div className="nft-item-cover">
                    <img src={nft.image} alt={nft.name} />
                  </div>
                  <div className="nft-item-desc">
                    <h3>{`${nft.name} #${nft.id}`}</h3>
                    <p>{nft.price ? `${nft.price} ETH` : "Not listed"}</p>
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
