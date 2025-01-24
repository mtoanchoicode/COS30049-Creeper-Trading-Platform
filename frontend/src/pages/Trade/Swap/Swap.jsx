import React, { useContext, useState } from "react";
import "./Swap.css";

import ConvertCurrencies from "../../../components/ConvertCurrencies/ConvertCurrencies";
import { Button } from "antd";
import RecurringSelection from "../../../components/RecurringSelection/RecurringSelection";

const ConvertTrade = () => {
  const [selectedOption, setSelectedOption] = useState("Swap");

  return (
    <div className="convert-trade">
      <div className="convert-trade-content">
        <div className="convert-trade-left">
          <div className="convert-trade-selection">
            <button
              onClick={() => setSelectedOption("Swap")}
              className={selectedOption === "Swap" ? "active" : ""}
            >
              Swap
            </button>
            <button
              onClick={() => setSelectedOption("Limit")}
              className={selectedOption === "Limit" ? "active" : ""}
            >
              Limit
            </button>
            <button
              onClick={() => setSelectedOption("Send")}
              className={selectedOption === "Send" ? "active" : ""}
            >
              Send
            </button>
            <button
              onClick={() => setSelectedOption("Buy")}
              className={selectedOption === "Buy" ? "active" : ""}
            >
              Buy
            </button>
          </div>
          <div className="convert-trade-container">
            <ConvertCurrencies />
            {selectedOption === "Recurring" ? <RecurringSelection /> : ""}
            <Button type="primary" block className="convert-trade-btn">
              Connect wallet
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConvertTrade;
