import React from "react";
import "./ConvertTrade.css";

import convert_history_icon from "../../assets/Convert History Icon.svg"

const ConvertTrade = () => {
  return (
    <div className="convert-trade">
      <div className="convert-trade-heading">
        <div className="convert-trade-heading-top">
          <h1>Crepper Convert</h1>
        </div>
        <div className="convert-trade-heading-bottom">
          <p>Instant Price | Guaranteed Price | Any Pair</p>
          <div className="convert-trade-history">
            <span className="tooltip-text">Convert History</span>
            <img src={convert_history_icon} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConvertTrade;
