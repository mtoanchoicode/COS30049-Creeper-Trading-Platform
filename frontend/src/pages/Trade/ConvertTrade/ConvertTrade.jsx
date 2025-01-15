import React, { useState } from "react";
import "./ConvertTrade.css";

import ConvertHeading from "../../../components/ConvertHeading/ConvertHeading";
import ConvertCurrencies from "../../../components/ConvertCurrencies/ConvertCurrencies";
import { Button } from "antd";
import { ConvertListCoins } from "../../../components/ConvertListCoins/ConvertListCoins";
import RecurringSelection from "../../../components/RecurringSelection/RecurringSelection";

const ConvertTrade = () => {
  const [selectedOption, setSelectedOption] = useState("Instant");

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
          <div className="convert-trade-container">
            <ConvertCurrencies />
            {selectedOption === "Recurring" ? <RecurringSelection /> : ""}
            <Button type="primary" block className="convert-trade-btn">
              Enter amount
            </Button>
          </div>
        </div>
        <div className="convert-trade-right">
          {selectedOption === "Instant" || selectedOption === "Recurring" ? (
            <>
              <h2>Convert BTC (Bitcoin) to other currencies</h2>
              <p className="convert-trade-right-desc">
                Swap your Bitcoin to other currencies easily in one go!
              </p>
              <ConvertListCoins />
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default ConvertTrade;
