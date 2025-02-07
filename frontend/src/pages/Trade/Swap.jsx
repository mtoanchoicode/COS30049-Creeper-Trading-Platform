import React from "react";

import ConvertCurrencies from "../../components/Trade/ConvertCurrencies/ConvertCurrencies";
import { Button } from "antd";
import SwapContainer from "../../components/Trade/SwapContainer/SwapContainer";

const ConvertTrade = () => {
  return (
    <div className="swap trade-child">
      <SwapContainer />
      <ConvertCurrencies />
      <Button type="primary" block className="swap-btn trade-btn">
        Connect wallet
      </Button>
    </div>
  );
};

export default ConvertTrade;
