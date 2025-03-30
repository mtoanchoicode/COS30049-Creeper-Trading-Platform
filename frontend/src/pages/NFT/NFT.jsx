import React, { useRef } from "react";
import "./NFT.css";

import NFTList from "../../components/NFT/NFTList/NFTList";
import NFTSupporter from "../../components/NFT/NFTSupporter/NFTSupporter";
import NFTHeader from "../../components/NFT/NFTHeader/NFTHeader";
import NFTBanner from "../../components/NFT/NFTBanner/NFTBanner";

const NFT = () => {
  const sectionRef = useRef(null);

  return (
    <div className="nft">
      <NFTHeader sectionRef={sectionRef} />
      <div ref={sectionRef} className="nft-section">
        <NFTList />
      </div>
      <NFTBanner />
      <NFTSupporter />
    </div>
  );
};

export default NFT;
