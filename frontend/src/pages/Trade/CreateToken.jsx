import React from "react";

import { ExportOutlined } from "@ant-design/icons";
import { useAppKitAccount, useAppKit } from "@reown/appkit/react";
import { Button } from "antd";
import CreateTokenContainer from "../../components/Trade/CreateTokenContainer/CreateTokenContainer";

const CreateToken = () => {
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
    return "Continue";
  };
  return (
    <div className="create trade-child">
      <div className="trade-main">
        <CreateTokenContainer />
        <Button
          type="primary"
          block
          className={`swap-btn trade-btn ${
            isConnected && !swapFromCurrencyValue && !swapToCurrencyValue
              ? "disabled"
              : "enabled"
          }`}
          onClick={() => handleButtonClick()}
        >
          {getButtonText()}
        </Button>
        <a
          className="trade-contractAddress"
          href={`https://sepolia.etherscan.io/address/}`}
          target="_blank"
        >
          <span>Contract address</span>
          <ExportOutlined />
        </a>
      </div>
    </div>
  );
};

export default CreateToken;
