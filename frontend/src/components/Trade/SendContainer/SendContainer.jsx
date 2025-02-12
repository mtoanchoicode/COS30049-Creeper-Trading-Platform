import React, { useContext, useState } from "react";
import "./SendContainer.css";
import { Input } from "antd";
import { CoinContext } from "../../../contexts/CoinContext";
import TokensSelection from "../TokensSelection/TokensSelection";

const SendContainer = () => {
  const { sendCurrency, setActiveOverlay } = useContext(CoinContext);
  const [value, setValue] = useState("");

  // Function to handle input change
  const handleChange = (e) => {
    let inputValue = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    setValue(inputValue ? `$${inputValue}` : ""); // If empty, reset to ""
  };

  return (
    <div className="send-container">
      <div className="send-tokens-exchange">
        <div className="send-top">
          <span>You're sending</span>
        </div>
        <div className="send-bottom">
          <div className="send-currency-input">
            <Input placeholder="$0" value={value} onChange={handleChange}/>
          </div>
          <div className="send-currency-change">
            <div>0 {sendCurrency.symbol.toUpperCase()}</div>
            <i className="fa-solid fa-arrow-right-arrow-left"></i>
          </div>
        </div>
      </div>

      <div className="send-tokens-selection" onClick={() => setActiveOverlay("send")}>
        <div className="send-tokens-selection-coin">
          <img
            src={sendCurrency.image}
            alt={sendCurrency.symbol.toUpperCase()}
          />
          <p>{sendCurrency.symbol.toUpperCase()}</p>
        </div>
        <div className="send-tokens-selection-icon">
          <i className="fa-solid fa-chevron-down"></i>
        </div>
      </div>

      <TokensSelection type="send" tradeType="send" />
    </div>
  );
};

export default SendContainer;
