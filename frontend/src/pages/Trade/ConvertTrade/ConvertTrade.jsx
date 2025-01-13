import React, { useState } from "react";
import "./ConvertTrade.css";

import ConvertHeading from "../../../components/ConvertHeading/ConvertHeading";

const ConvertTrade = () => {
  const [selectedOption, setSelectedOption] = useState("Instant");

  console.log(selectedOption);

  return (
    <div className="convert-trade">
      <ConvertHeading />
      <div className="convert-trade-content">
        <div className="convert-trade-left">
          <div className="convert-trade-selection">
            <button
              onClick={() => setSelectedOption("Instant")}
              className={selectedOption === "Instant" ? "active" : ""}
            >
              Instant
            </button>
            <button
              onClick={() => setSelectedOption("Recurring")}
              className={selectedOption === "Recurring" ? "active" : ""}
            >
              Recurring
            </button>
            <button
              onClick={() => setSelectedOption("Limit")}
              className={selectedOption === "Limit" ? "active" : ""}
            >
              Limit
            </button>
          </div>
        </div>
        <div className="convert-trade-right"></div>
      </div>
    </div>
  );
};

export default ConvertTrade;
