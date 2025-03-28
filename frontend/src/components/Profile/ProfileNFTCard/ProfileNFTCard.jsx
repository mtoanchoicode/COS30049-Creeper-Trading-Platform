import React from "react";
import "./ProfileNFTCard.css";

const ProfileNFTCard = ({ nft }) => {
  return (
    <div className="profileNft-card">
      <div className="profileNft-image-container">
        <img
          src={nft.image.replace("ipfs://", "https://ipfs.io/ipfs/")}
          alt={nft.name}
          className="profileNft-image"
        />
        <span className="profileNft-balance">x{nft.balance}</span>
      </div>
      <div className="profileNft-info">
        <p className="profileNft-name">{nft.name}</p>
        <p className="profileNft-collection">
          {nft.collection.name} ({nft.collection.symbol})
        </p>
      </div>
    </div>
  );
};

export default ProfileNFTCard;
