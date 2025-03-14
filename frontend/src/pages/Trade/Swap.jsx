import React, { useContext } from "react";
import { useAppKitAccount, useAppKit } from "@reown/appkit/react";
import { Button } from "antd";
import SwapContainer from "../../components/Trade/SwapContainer/SwapContainer";
import TransactionHistory from "../../components/Trade/TransactionHistory/TransactionHistory";
import { CoinContext } from "../../contexts/CoinContext";
import { ExportOutlined } from "@ant-design/icons";

const Swap = ({ showHistory = true }) => {
  const { swapFromCurrencyValue, swapToCurrencyValue } =
    useContext(CoinContext);
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
    if (!swapFromCurrencyValue && !swapToCurrencyValue)
      return "Enter an amount";
    return "Continue";
  };

  return (
    <div className="swap trade-child">
      <div className="trade-main">
        <SwapContainer />
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
      {showHistory && (
        <div className="trade-history">
          <TransactionHistory />
        </div>
      )}
    </div>
  );
};

export default Swap;
