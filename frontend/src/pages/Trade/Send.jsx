import React from "react";

import SendContainer from "../../components/Trade/SendContainer/SendContainer";
import { SendWalletAddress } from "../../components/Trade/SendWalletAddress/SendWalletAddress";
import { Button } from "antd";

const Send = () => {
  return (
    <div className="send trade-child ">
      <SendContainer />
      <SendWalletAddress />
      <Button type="primary" block className="send-btn trade-btn">
        Connect wallet
      </Button>
    </div>
  );
};

export default Send;
