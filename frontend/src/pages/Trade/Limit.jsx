import React from "react";

import { Button } from "antd";
import LimitPrice from "../../components/Trade/LimitPrice/LimitPrice";
import LimitExpired from "../../components/Trade/LimitExpired/LimitExpired";
import { useAppKitAccount } from "@reown/appkit/react";
import LimitContainer from "../../components/Trade/LimitContainer/LimitContainer";

const Limit = () => {
  const { isConnected } = useAppKitAccount();
  return (
    <div className="limit trade-child">
      <LimitPrice />
      <LimitContainer />
      <LimitExpired />
      <Button type="primary" block className="limit-btn trade-btn">
        {isConnected ? "Enter amount" : "Connect wallet"}
      </Button>
    </div>
  );
};

export default Limit;
