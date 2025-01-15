import React from "react";
import "./ConvertHeading.css";

import convert_history_icon from "../../assets/Convert History Icon.svg";
import Icons from "../Icons/Icons";

const ConvertHeading = () => {
  return (
    <div className="convert-trade-heading">
      <div className="convert-trade-heading-top">
        <h1>Crepper Convert</h1>
      </div>
      <div className="convert-trade-heading-bottom">
        <p>
          <span>Instant Price</span>
          <span>|</span>
          <span>Guaranteed Price</span>
          <span>|</span>
          <span>Any Pair</span>
        </p>
        <div className="convert-trade-history">
          <span className="tooltip-text">Convert History</span>
          <Icons src={convert_history_icon} alt="Convert history icon" />
        </div>
      </div>
    </div>
  );
};

export default ConvertHeading;
