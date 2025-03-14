import React, { useContext, useEffect, useState } from "react";
import "./SendContainer.css";
import { Input } from "antd";
import { CoinContext } from "../../../contexts/CoinContext";
import TokensSelection from "../TokensSelection/TokensSelection";

const SendContainer = ({ setAmount, setTokenAddress }) => {
  const {
    sendCurrency,
    sendCurrencyValue,
    handleSendCurrencyValueChange,
    setActiveOverlay,
    sendTokenAddress,
    setSendTokenAddress,
  } = useContext(CoinContext);
  const [value, setValue] = useState("");

  // Update token address when currency changes
  useEffect(() => {
    if (sendCurrency.address) {
      setTokenAddress(sendCurrency.address);
      setSendTokenAddress(sendCurrency.address);
    } else {
      setTokenAddress(null);
      setSendTokenAddress(null);
    }
    // Reset amount when currency changes
    if (value) {
      handleSendCurrencyValueChange(value.replace("$", "")); // Recalculate new token equivalent
    }
  }, [sendCurrency]);

  // Function to handle input change
  const handleAmountChange = (e) => {
    let inputValue = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    let numericValue = inputValue
      ? Math.max(0, Math.min(9999, Number(inputValue)))
      : "";
    setValue(numericValue ? `$${numericValue}` : ""); // If empty, reset to ""
    setAmount(numericValue);
    console.log("numericValue", numericValue);
    handleSendCurrencyValueChange(numericValue);
  };

  return (
    <div className="send-container">
      <div className="send-tokens-exchange">
        <div className="send-top">
          <span>You're sending</span>
          <span>Fee (0.3%)</span>
        </div>
        <div className="send-bottom">
          <div className="send-currency-input">
            <Input
              placeholder="$0"
              value={value}
              onChange={handleAmountChange}
            />
          </div>
          <div className="send-currency-change">
            <div>
              {sendCurrencyValue ? sendCurrencyValue.toFixed(5) : "0"}{" "}
              {sendCurrency.symbol.toUpperCase()}
            </div>
          </div>
        </div>
      </div>

      <div
        className="send-tokens-selection"
        onClick={() => setActiveOverlay("send")}
      >
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
