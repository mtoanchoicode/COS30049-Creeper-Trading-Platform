import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ethers } from "ethers";
import "./NFTCollection.css";
import { useAppKitAccount } from "@reown/appkit/react";
import NFTCollectionHeader from "../../../components/NFT/NFTCollectionHeader/NFTCollectionHeader";

const NFTCollection = () => {
  const { address } = useAppKitAccount();
  const [authOwner, setAuthOwner] = useState(false);
  const [nfts, setNfts] = useState([]);
  const [date, setDate] = useState("");
  const [lengths, setLengths] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const nft = location.state?.nft;

  const MARKETPLACE_CONTRACT_ADDRESS =
    "0x96eBF50a52f224e80fc9CCbD2169321521316E7e"; // Replace with your contract address
  const MARKETPLACE_ABI = [
    "function getNFTListingPrice(address nftContract, uint256 tokenId) public view returns (uint256)",
  ];

  const NFT_CONTRACT_ADDRESS = nft.ContractAddress;

  const NFT_ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function owner() view returns (address)",
    "function totalSupply() view returns (uint256)", // Only available if contract implements it
    "function tokenURI(uint256 tokenId) view returns (string)",
    "function ownerOf(uint256 tokenId) view returns (address)",
    "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
  ]; // Replace with your deployed contract

  const fetchContractOwner = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(
        NFT_CONTRACT_ADDRESS,
        NFT_ABI,
        provider
      );

      const collectionOwner = await contract.owner();
      console.log("Contract Owner Address:", collectionOwner);

      if (address && collectionOwner) {
        setAuthOwner(collectionOwner.toLowerCase() === address.toLowerCase());
      }
      console.log(collectionOwner)
      console.log(address)
      console.log(authOwner)
    } catch (error) {
      console.error("Failed to get contract owner:", error);
    }
  };

  const fetchNFTsFromEvents = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(
        NFT_CONTRACT_ADDRESS,
        NFT_ABI,
        provider
      );
      const marketplaceContract = new ethers.Contract(
        MARKETPLACE_CONTRACT_ADDRESS,
        MARKETPLACE_ABI,
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

            let listingPrice;
            try {
              listingPrice = await marketplaceContract.getNFTListingPrice(
                NFT_CONTRACT_ADDRESS,
                tokenId
              );
              listingPrice = ethers.formatEther(listingPrice); // Convert from wei to ETH
            } catch (err) {
              listingPrice = "Not listed";
            }

            return {
              id: tokenId,
              name: metadata.name || `Token #${tokenId}`,
              image,
              description: metadata.description || "No description available",
              collectionName,
              collectionAddress,
              lastUpdated: new Date(block.timestamp * 1000).toLocaleString(),
              owner,
              price: listingPrice,
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
      await fetchContractOwner();
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

  return (
    <div className="nft-collection">
      <div className="nft-collection-header">
        <NFTCollectionHeader
          isLoading={isLoading}
          nft={nft}
          authOwner={authOwner}
          date={date}
          lengths={lengths}
          contractAddress={NFT_CONTRACT_ADDRESS}
        />
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
                    <p>
                      {nft.price !== "Not listed"
                        ? `${nft.price} ETH`
                        : "Not listed"}
                    </p>
                  </div>
                  <div className="nft-item-buy">
                    <p>
                      {nft.price !== "Not listed" ? "Buy" : "View Details"}
                    </p>
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
