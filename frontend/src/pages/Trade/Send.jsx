import React from "react";
import { useAppKitAccount, useAppKit } from "@reown/appkit/react";

import SendContainer from "../../components/Trade/SendContainer/SendContainer";
import SendWalletAddress from "../../components/Trade/SendWalletAddress/SendWalletAddress";
import { Button } from "antd";

const Send = () => {
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
    <div className="send trade-child ">
      <SendContainer />
      <SendWalletAddress />
      <Button
        type="primary"
        block
        className="send-btn trade-btn"
        onClick={() => handleButtonClick()}
      >
        {isConnected ? "Enter amount" : "Connect wallet"}
      </Button>
    </div>
  );
};

export default Send;
