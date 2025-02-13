import React, { useContext, useState } from "react";
import { useAppKitAccount, useAppKit } from "@reown/appkit/react";

import SendContainer from "../../components/Trade/SendContainer/SendContainer";
import SendWalletAddress from "../../components/Trade/SendWalletAddress/SendWalletAddress";
import { Button } from "antd";

const Send = () => {
  const { isConnected } = useAppKitAccount();
  const { open } = useAppKit();
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const handleButtonClick = () => {
    if (!isConnected) {
      open();
    } else if (amount) {
      console.log("Button clicked!");
    }
  };

  const getButtonText = () => {
    if (!isConnected) return "Connect wallet";
    if (!amount) return "Enter an amount";
    if (!recipient) return "Select recipient"
    return "Continue";
  };

  return (
    <div className="send trade-child ">
      <SendContainer setAmount={setAmount} />
      <SendWalletAddress setRecipient={setRecipient}/>
      <Button
        type="primary"
        block
        className={`send-btn trade-btn ${
          !amount || !recipient ? "disabled" : "enabled"
        }`}
        onClick={() => handleButtonClick()}
      >
        {getButtonText()}
      </Button>
    </div>
  );
};

export default Send;
