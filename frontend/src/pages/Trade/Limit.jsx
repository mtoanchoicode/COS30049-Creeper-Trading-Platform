import React, { useContext } from "react";
import { useAppKitAccount, useAppKit } from "@reown/appkit/react";

import { Button } from "antd";
import LimitPrice from "../../components/Trade/LimitPrice/LimitPrice";
import LimitExpired from "../../components/Trade/LimitExpired/LimitExpired";
import LimitContainer from "../../components/Trade/LimitContainer/LimitContainer";
import { CoinContext } from "../../contexts/CoinContext";

const Limit = () => {
  const { limitFromCurrencyValue, limitToCurrencyValue } =
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
    if (!limitFromCurrencyValue && !limitToCurrencyValue)
      return "Enter an amount";
    return "Continue";
  };

  return (
    <div className="limit trade-child">
      <LimitPrice />
      <LimitContainer />
      <LimitExpired />
      <Button
        type="primary"
        block
        className={`limit-btn trade-btn ${
          isConnected && !limitFromCurrencyValue && !limitToCurrencyValue
            ? "disabled"
            : "enabled"
        }`}
      >
        {getButtonText()}
      </Button>
    </div>
  );
};

export default Limit;
