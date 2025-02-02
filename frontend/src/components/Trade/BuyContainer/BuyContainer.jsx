import React from "react";
import "./BuyContainer.css";
import { Input } from "antd";

export const BuyContainer = () => {
  return (
    <div className="buy-container">
      <div className="buy-top">
        <span>You're buying</span>
      </div>
      <div className="buy-bottom">
        <div className="buy-currency-input">
          <Input placeholder="$0" />
        </div>
        <div className="buy-currency-selection">
          <div>Select a token</div>
          <i className="fa-solid fa-chevron-down"></i>
        </div>
        <div className="buy-price-quick-selection">
          <button>$100</button>
          <button>$300</button>
          <button>$500</button>
        </div>
      </div>
    </div>
  );
};
