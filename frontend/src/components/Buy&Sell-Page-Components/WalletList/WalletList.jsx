import React from "react";
import Wallets from "./WalletListHanle";

import CoinIcon from "../../../assets/Coin-icon.svg";
import Cardpos from "../../../assets/Card-pos.svg";
import ShopingCart from "../../../assets/Shopping-cart.svg";
import BuyCoin from "../../../assets/Buy-crypto.svg";

const WalletList = () => {
  const wallets = [
    {
      src: CoinIcon,
      alt: "picture of step 1",
      name: "Metamask",
    },
    {
      src: Cardpos,
      alt: "picture of step 2",
      name: "Binance",
    },
    {
      src: ShopingCart,
      alt: "picture of step 3",
      name: "Lorem Ispum",
    },
    {
      src: BuyCoin,
      alt: "picture of step 4",
      name: "Lorem Ispum",
    },
  ];

  return <Wallets 
    wallets={wallets} 
    title="wallets we support" 
    subtitle = "Trade With World's Most Trusted And Fastest Wallets"
  />;
};

export default WalletList;
