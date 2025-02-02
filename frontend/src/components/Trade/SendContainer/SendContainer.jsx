import React, { useContext } from "react";
import "./SendContainer.css";
import { Input } from "antd";
import { CoinContext } from "../../../contexts/CoinContext";

const SendContainer = () => {
  const { fromCurrency } = useContext(CoinContext);

  return (
    <div className="send-container">
      <div className="send-tokens-exchange">
        <div className="send-top">
          <span>You're sending</span>
        </div>
        <div className="send-bottom">
          <div className="send-currency-input">
            <Input placeholder="$0" />
          </div>
          <div className="send-currency-change">
            <div>0 ETH</div>
            <i className="fa-solid fa-arrow-right-arrow-left"></i>
          </div>
        </div>
      </div>

      <div className="send-tokens-selection">
        <div className="send-tokens-selection-coin">
          <img
            src={fromCurrency.image}
            alt={fromCurrency.symbol.toUpperCase()}
          />
          <p>ETH</p>
        </div>
        <div className="send-tokens-selection-icon">
          <i className="fa-solid fa-chevron-down"></i>
        </div>
      </div>
    </div>
  );
};

export default SendContainer;
