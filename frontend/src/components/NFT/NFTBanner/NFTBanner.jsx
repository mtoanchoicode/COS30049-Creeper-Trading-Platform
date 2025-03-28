import React from "react";
import "./NFTBanner.css"; // Import CSS file

const NFTBanner = () => {
  return (
    <div className="nft-banner">
      <h4 className="nft-banner-headline">
        Your Wallet, Your Assets, Your Control
      </h4>
      <div className="nft-banner-description">
        <p>
          Browse your owned NFTs, track wallet activity, and personalize your
          account settings
        </p>
        <i className="fa-solid fa-chevron-right"></i>
      </div>
    </div>
  );
};

export default NFTBanner;
