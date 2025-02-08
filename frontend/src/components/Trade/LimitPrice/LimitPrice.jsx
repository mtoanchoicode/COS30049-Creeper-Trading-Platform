import React, { useContext, useState } from "react";
import "./LimitPrice.css";

import CurrencySelection from "../CurrencySelection/CurrencySelection";
import { CoinContext } from "../../../contexts/CoinContext";
import { Input } from "antd";

const LimitPrice = () => {
  const { limitFromCurrency, limitToCurrency } = useContext(CoinContext);
  const [active, setActive] = useState("market");

  return (
    <div className="limit-price">
      <div className="limit-price-top">
        <div className="limit-price-heading">
          When 1 <span>{limitFromCurrency.symbol.toUpperCase()}</span> is worth
        </div>
        <div className="limit-price-icon">
          <i class="fa-solid fa-arrow-right-arrow-left"></i>
        </div>
      </div>
      <div className="limit-price-center">
        <div className="limit-price-price-display">
          <Input value={limitFromCurrency.current_price} />
        </div>
        <div className="limit-price-tokens-selection">
          <img src={limitToCurrency.image} alt={limitToCurrency.symbol} />
          <p>{limitToCurrency.symbol.toUpperCase()}</p>
        </div>
      </div>
      <div className="limit-price-bottom">
        <button
          onClick={() => setActive("market")}
          className={active === "market" ? "active" : ""}
        >
          Market
        </button>
        <button
          onClick={() => setActive("1")}
          className={active === "1" ? "active" : ""}
        >
          +1%
        </button>
        <button
          onClick={() => setActive("5")}
          className={active === "5" ? "active" : ""}
        >
          +5%
        </button>
        <button
          onClick={() => setActive("10")}
          className={active === "10" ? "active" : ""}
        >
          +10%
        </button>
      </div>
    </div>
  );
};

export default LimitPrice;
