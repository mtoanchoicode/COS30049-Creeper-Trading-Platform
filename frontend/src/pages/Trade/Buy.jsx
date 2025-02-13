import React, { useContext, useState } from "react";
import { useAppKitAccount, useAppKit } from "@reown/appkit/react";
import BuyContainer from "../../components/Trade/BuyContainer/BuyContainer";
import { Button } from "antd";
import { CoinContext } from "../../contexts/CoinContext";

const Buy = () => {
  const { isConnected } = useAppKitAccount();
  const { open } = useAppKit();
  const { setActiveOverlay, buyCurrency } = useContext(CoinContext);
  const [amount, setAmount] = useState("");

  const handleButtonClick = () => {
    if (!isConnected) {
      open();
    } else if (amount) {
      console.log("Button clicked!");
    }
  };

  const getButtonText = () => {
    if (!isConnected) return "Connect wallet";
    if (!buyCurrency) return "Select a token";
    if (!amount) return "Enter an amount";
    return "Continue";
  };

  return (
    <div className="buy trade-child">
      <BuyContainer
        setAmount={setAmount}
        currency={buyCurrency}
        setActiveOverlay={setActiveOverlay}
      />
      <Button
        type="primary"
        block
        className={`buy-btn trade-btn ${
          !amount || !buyCurrency ? "disabled" : "enabled"
        }`}
        onClick={handleButtonClick}
      >
        {getButtonText()}
      </Button>
    </div>
  );
};

export default Buy;
