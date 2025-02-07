import React from "react";
import BuyCryptoFlow from "../../../components/Buy&Sell-Page-Components/BuySellCryptoFlow/BuyCryptoFlow";
import WalletList from "../../../components/Buy&Sell-Page-Components/WalletList/WalletList";
import PopularConversions from "../../../components/Buy&Sell-Page-Components/PopularConversions/PopularConversions";
import { BuyContainer } from "../../../components/Trade/BuyContainer/BuyContainer";
import { Button } from "antd";

const Buy = () => {
  return (
    <div className="buy trade-child ">
      <BuyContainer 
      
      />
      <Button type="primary" block className="buy-btn trade-btn">
        Connect wallet
      </Button>
      <BuyCryptoFlow />
      <WalletList />
      <PopularConversions />
    </div>
  );
};

export default Buy;
