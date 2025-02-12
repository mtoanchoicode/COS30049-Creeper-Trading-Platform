import React from "react";
import { useAppKitAccount, useAppKit } from "@reown/appkit/react";

import BuyContainer from "../../components/Trade/BuyContainer/BuyContainer";
import { Button } from "antd";

const Buy = () => {
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
    <div className="buy trade-child ">
      <BuyContainer />
      <Button
        type="primary"
        block
        className="buy-btn trade-btn"
        onClick={() => handleButtonClick()}
      >
        {isConnected ? "Enter amount" : "Connect wallet"}
      </Button>
    </div>
  );
};

export default Buy;
