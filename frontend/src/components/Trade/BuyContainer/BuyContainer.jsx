import React, { useContext, useState } from "react";
import "./BuyContainer.css";
import { Input } from "antd";
import TokensSelection from "../TokensSelection/TokensSelection";


const BuyContainer = ({ setAmount, currency, setActiveOverlay }) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    let inputValue = e.target.value.replace(/[^0-9]/g, "");
    let numericValue = inputValue
      ? Math.max(0, Math.min(9999, Number(inputValue)))
      : "";
    setValue(numericValue ? `$${numericValue}` : "");
    setAmount(numericValue);
  };

  const handlePresetValue = (amount) => {
    setValue(`$${amount}`);
    setAmount(amount);
  };

  return (
    <div className="buy-container">
      <div className="buy-top">
        <span>You're buying</span>
      </div>
      <div className="buy-bottom">
        <div className="buy-currency-input">
          <Input placeholder="$0" value={value} onChange={handleChange} />
        </div>
        <div
          className={`buy-token-selection ${currency ? "active" : "inactive"}`}
          onClick={() => setActiveOverlay("buy")}
        >
          <div>
            {currency ? currency.symbol.toUpperCase() : "Select a token"}
          </div>
          <i className="fa-solid fa-chevron-down"></i>
        </div>
        <div className="buy-price-quick-selection">
          <button onClick={() => handlePresetValue(100)}>$100</button>
          <button onClick={() => handlePresetValue(300)}>$300</button>
          <button onClick={() => handlePresetValue(500)}>$500</button>
        </div>
      </div>
      <TokensSelection type="buy" tradeType="buy" />
    </div>
  );
};

export default BuyContainer;
