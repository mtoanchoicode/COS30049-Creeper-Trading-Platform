import React from "react";
import "./NFTHeader.css";

import { Button } from "antd";

const NFTHeader = ({ sectionRef }) => {
  const handleScroll = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="nft-header">
      <div className="nft-header-left">
        <h1 className="nft-header-title">
          A <span> New Era </span> Of <br /> NFT Utility
        </h1>
        <p className="nft-header-slogan">
          On The World’s First & Largest NFT Marketplace
        </p>
        <Button onClick={handleScroll}>Explore</Button>
        <div className="nft-header-desc">
          <div className="nft-header-desc-details">
            <p className="nft-header-desc-num">32K+</p>
            <p className="nft-header-desc-text">Artwork</p>
          </div>
          <div className="nft-header-desc-details">
            <p className="nft-header-desc-num">10K+</p>
            <p className="nft-header-desc-text">Artist</p>
          </div>
        </div>
      </div>
      <div className="nft-header-right">
        {/* <div className="swipe">
            <img src={test} alt="" />
            <p></p>
        </div> */}
      </div>
    </div>
  );
};

export default NFTHeader;
