import React, { useContext, useState } from "react";
import "./BuyContainer.css";
import { Input } from "antd";
import { CoinContext } from "../../../contexts/CoinContext";
import TokensSelection from "../TokensSelection/TokensSelection";

const BuyContainer = () => {
  const {setActiveOverlay} = useContext(CoinContext);
  const [value, setValue] = useState("");

  // Function to handle input changes
  const handleChange = (e) => {
    let inputValue = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    setValue(inputValue ? `$${inputValue}` : ""); // If empty, reset to ""
  };

  // Function to set predefined values
  const handlePresetValue = (amount) => {
    setValue(`$${amount}`);
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
        <div className="buy-currency-selection"  onClick={() => setActiveOverlay("buy")}>
          <div>Select a token</div>
          <i className="fa-solid fa-chevron-down"></i>
        </div>
        <div className="buy-price-quick-selection">
          <button onClick={() => handlePresetValue(100)}>$100</button>
          <button onClick={() => handlePresetValue(300)}>$300</button>
          <button onClick={() => handlePresetValue(500)}>$500</button>
        </div>
      </div>
      <TokensSelection type="buy" tradeType="buy"/>
    </div>
  );
};

export default BuyContainer;
