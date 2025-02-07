import React from "react";

import ConvertCurrencies from "../../components/Trade/ConvertCurrencies/ConvertCurrencies";
import { Button } from "antd";
import LimitPrice from "../../components/Trade/LimitPrice/LimitPrice";
import LimitExpired from "../../components/Trade/LimitExpired/LimitExpired";

const Limit = () => {
  return (
    <div className="limit trade-child">
      <LimitPrice />
      <ConvertCurrencies />
      <LimitExpired />
      <Button type="primary" block className="limit-btn trade-btn">
        Connect wallet
      </Button>
    </div>
  );
};

export default Limit;
