import React, { useContext } from "react";
import { useAppKitAccount, useAppKit } from "@reown/appkit/react";

import { Button } from "antd";
import SwapContainer from "../../components/Trade/SwapContainer/SwapContainer";

const Swap = () => {
  const { isConnected } = useAppKitAccount();
  const { open } = useAppKit();
  const handleButtonClick = () => {
    if (!isConnected) {
      open();
    } else {
      console.log("Button clicked!");
    }
  };
  return (
    <div className="swap trade-child">
      <SwapContainer />
      <Button
        type="primary"
        block
        className="swap-btn trade-btn"
        onClick={() => handleButtonClick()}
      >
        {isConnected ? "Enter amount" : "Connect wallet"}
      </Button>
    </div>
  );
};

export default Swap;
