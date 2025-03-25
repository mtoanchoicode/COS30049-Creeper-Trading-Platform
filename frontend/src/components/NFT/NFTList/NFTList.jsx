import React, { useEffect, useState } from "react";
import { getNFTs } from "../../../utils/getNFTs";

const NFTList = () => {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    const fetchNFTs = async () => {
      const data = await getNFTs();
      setNfts(data);
    };
    fetchNFTs();
  }, []);

  return (
    <div className="nft-list">
      {nfts.length > 0 ? (
        nfts.map((nft, index) => (
          <div key={index} className="nft-card">
            <img src={nft.image} alt={nft.name} />
            <h3>{nft.name}</h3>
            <p>Price: {nft.price ? `${nft.price} ETH` : "N/A"}</p>
          </div>
        ))
      ) : (
        <p>No NFTs available</p>
      )}
    </div>
  );
};

export default NFTList;

