import React from "react";

import { BuyContainer } from "../../../components/Trade/BuyContainer/BuyContainer";
import { Button } from "antd";

const Buy = () => {
  return (
    <div className="buy trade-child ">
      <BuyContainer />
      <Button type="primary" block className="buy-btn trade-btn">
        Connect wallet
      </Button>
    </div>
  );
};

export default Buy;
