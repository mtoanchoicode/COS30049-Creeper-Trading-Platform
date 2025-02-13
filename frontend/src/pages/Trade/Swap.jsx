import React, { useContext } from "react";
import { useAppKitAccount, useAppKit } from "@reown/appkit/react";

import { Button } from "antd";
import SwapContainer from "../../components/Trade/SwapContainer/SwapContainer";
import { CoinContext } from "../../contexts/CoinContext";

const Swap = () => {
  const { swapFromCurrencyValue, swapToCurrencyValue } = useContext(CoinContext);
  const { isConnected } = useAppKitAccount();
  const { open } = useAppKit();

  const handleButtonClick = () => {
    if (!isConnected) {
      open();
    } else if (amount) {
      console.log("Button clicked!");
    }
  };

  const getButtonText = () => {
    if (!isConnected) return "Connect wallet";
    if (!swapFromCurrencyValue && !swapToCurrencyValue) return "Enter an amount";
    return "Continue";
  };

  return (
    <div className="swap trade-child">
      <SwapContainer />
      <Button
        type="primary"
        block
        className={`swap-btn trade-btn ${
          !swapFromCurrencyValue && !swapToCurrencyValue ? "disabled" : "enabled"
        }`}
        onClick={() => handleButtonClick()}
      >
        {getButtonText()}
      </Button>
    </div>
  );
};

export default Swap;
