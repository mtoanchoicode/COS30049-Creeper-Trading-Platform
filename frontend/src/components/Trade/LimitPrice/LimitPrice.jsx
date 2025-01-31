import React from "react";
import CurrencySelection from "../CurrencySelection/CurrencySelection";

const LimitPrice = () => {

  return (
    <div className="limitprice">
      <div className="limitprice-container">
        <div className="limitprice-container-top">
          <div className="limitprice-heading">When 1 is worth</div>
          <div className="limitprice-icon">
            <i class="fa-solid fa-arrow-right-arrow-left"></i>
          </div>
        </div>
        <div className="limitprice-container-center">
          <div className="limitprice-price-display"></div>
          <div className="limitprice-tokens-selection">
          </div>
        </div>
        <div className="limitprice-container-bottom">
          <div className="limitprice-price-selections">
            <button className="limitprice-price-btn">Market</button>
            <button className="limitprice-price-btn">+1%</button>
            <button className="limitprice-price-btn">+5%</button>
            <button className="limitprice-price-btn">+10%</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LimitPrice;
