import React from "react";
import { useAppKitAccount, useAppKit } from "@reown/appkit/react";

import { Button } from "antd";
import LimitPrice from "../../components/Trade/LimitPrice/LimitPrice";
import LimitExpired from "../../components/Trade/LimitExpired/LimitExpired";
import LimitContainer from "../../components/Trade/LimitContainer/LimitContainer";

const Limit = () => {
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
    <div className="limit trade-child">
      <LimitPrice />
      <LimitContainer />
      <LimitExpired />
      <Button
        type="primary"
        block
        className="limit-btn trade-btn"
        onClick={() => handleButtonClick()}
      >
        {isConnected ? "Enter amount" : "Connect wallet"}
      </Button>
    </div>
  );
};

export default Limit;
