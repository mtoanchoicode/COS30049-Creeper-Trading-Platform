import React from "react";
import Wallets from "./WalletListHanle";

import TrustWallet from "../../../assets/trust-wallet.jpg";
import OKXWallet from "../../../assets/okx-wallet.png";
import BinanceWallet from "../../../assets/binance-wallet.png";
import MetaMaskWallet from "../../../assets/metamask-wallet.png";

const WalletList = () => {
  const wallets = [
    {
      src: MetaMaskWallet,
      alt: "picture of metamask wallet",
      name: "Metamask Wallet",
    },
    {
      src: TrustWallet,
      alt: "picture trust wallet",
      name: "Trust Wallet",
    },
    {
      src: BinanceWallet,
      alt: "picture of binance wallet",
      name: "Binance Wallet",
    },
    {
      src: OKXWallet,
      alt: "picture OKX wallet",
      name: "OKX Wallet",
    },
  ];

  return <Wallets 
    wallets={wallets} 
    title="Popular wallets in Creeper" 
    subtitle = "Trade With World's Most Trusted And Fastest Wallets"
  />;
};

export default WalletList;
