import React, { useContext, useState } from "react";
import "./BuyContainer.css";
import { Input } from "antd";
import TokensSelection from "../TokensSelection/TokensSelection";
import { CoinContext } from "../../../contexts/CoinContext";


const BuyContainer = ({ setAmount, currency }) => {
  const [value, setValue] = useState("");

  const {
    buyCurrencyValue,
    handleBuyCurrencyValueChange
  } = useContext(CoinContext);


  const handleChange = (e) => {
    let inputValue = e.target.value.replace(/[^0-9]/g, "");
    let numericValue = inputValue
      ? Math.max(0, Math.min(9999, Number(inputValue)))
      : "";
    setValue(numericValue ? `$${numericValue}` : "");
    setAmount(numericValue);
    handleBuyCurrencyValueChange(numericValue);
  };

  const handlePresetValue = (amount) => {
    setValue(`$${amount}`);
    setAmount(amount);
    handleBuyCurrencyValueChange(amount);
  };

  return (
    <div className="buy-container">
      <div className="buy-top">
        <span>You're buying</span>
        <span>Fee (0.3%)</span>
      </div>
      <div className="buy-bottom">
        <div className="buy-currency-input">
          <Input placeholder="$0" value={value} onChange={handleChange} />
        </div>
        <div className="send-currency-change">
          <div>
            {buyCurrencyValue ? buyCurrencyValue.toFixed(5) : "0"}{" "}
            {currency.symbol.toUpperCase()}
          </div>
        </div>
        <div className="buy-token-selection">
          <img src={currency.image} alt={currency.symbol} />
          <div>{currency.symbol.toUpperCase()}</div>
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
