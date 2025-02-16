import React from "react";
import CreeperHandle from "./CreeperEcosystemHandle";

import NFT_Icon from "../../../assets/NFT_Icon.svg";
import Charity_Icon from "../../../assets/Charity_Icon.svg";
import Wifi_Icon from "../../../assets/Wifi_Icon.svg";
import Academy_Icon from "../../../assets/Academy_Icon.svg";
import BuyCoin from "../../../assets/Buy-crypto.svg";
import Book_Icon from "../../../assets/Book_Icon.svg";

const CreeperEcosystem = () => {
  const ecosystem = [
    {
      src: Book_Icon,
      alt: " Book Icon",
      Title: "Creeper Research",
      Content: "Creeper Research provides institutional-grade analysis, in-depth insights, and unbiased information to all participants in the digital asset industry."
    },
    {
      src: Academy_Icon,
      alt: "Academy Icon",
      Title: "Creeper Academy",
      Content: "Creeper Academy is an open-access learning hub, providing free blockchain and crypto education in over 10 languages."
    },
    {
      src: Charity_Icon,
      alt: "Charity Icon",
      Title: "Creeper Charity",
      Content: "Creeper Charity is a non-profit organization dedicated to building a future where Web3 technology is used as a force of good."
    },
    {
        src: BuyCoin,
        alt: "Buy Coin Icon",
        Title: "Creeper Swap",
        Content: "Creeper Swap is the best website for swap coin in the the fastest way."
    },
    {
      src: Wifi_Icon,
      alt: "Wifi Icon ",
      Title: "Creeper Square",
      Content: "Creeper Square is a single touchpoint for the latest trends in Web3, displaying a range of content from crypto experts, enthusiasts, and media sources as it goes live."
    },
    {
        src: NFT_Icon,
        alt: "NFT Icon",
        Title: "Creeper NFT",
        Content: "Creeper NFT will be updated soon ! "
    },
  ];

  return <CreeperHandle 
    Ecosystems={ecosystem} 
    title="Our Ecosystem" 
    subtitle = "Our platform is trusted by millions worldwide, and features an unmatched portfolio of financial product offerings."
  />;
};

export default CreeperEcosystem;
