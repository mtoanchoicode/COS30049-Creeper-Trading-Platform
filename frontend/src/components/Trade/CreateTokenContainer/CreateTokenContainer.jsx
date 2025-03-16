import { Input } from "antd";
import React from "react";
import "./CreateTokenContainer.css";

const CreateTokenContainer = ({
  setTokenName,
  setTokenSymbol,
  setTotalSupply,
}) => {
  return (
    <div className="create-token-container">
      <div className="send-top">
        <span>Creating your own testnet token</span>
        <span>Fee 0.001 ETH</span>
      </div>
      <div className="send-wallet-address">
        <div className="send-wallet-title">
          <span>Token Name</span>
        </div>
        <div className="send-wallet-input">
          <Input
            placeholder="Bitcoin, Ethereum, etc."
            onChange={(e) => setTokenName(e.target.value)}
            className="input-field"
          />
        </div>
      </div>
      <div className="send-wallet-address">
        <div className="send-wallet-title">
          <span>Token Name</span>
        </div>
        <div className="send-wallet-input">
          <Input
            placeholder="ETH, BTC, etc."
            onChange={(e) => setTokenSymbol(e.target.value)}
            className="input-field"
          />
        </div>
      </div>
      <div className="send-wallet-address">
        <div className="send-wallet-title">
          <span>Total Supply (mint to the creator)</span>
        </div>
        <div className="send-wallet-input">
          <Input
            type="number"
            placeholder="1000000"
            onChange={(e) => setTotalSupply(e.target.value)}
            className="input-field"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateTokenContainer;
