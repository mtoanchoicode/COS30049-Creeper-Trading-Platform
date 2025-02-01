import { Input } from "antd";
import React from "react";
import "./SendWalletAddress.css";
import CurrencySelection from "../CurrencySelection/CurrencySelection";

export const SendWalletAddress = () => {
  return (
    <div className="send-wallet-address">
      <div className="send-wallet-title">
        <span>To</span>
      </div>
      <div className="send-wallet-input">
        <Input placeholder="Wallet address or ENS name" />
      </div>
    </div>
  );
};
