import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./TradeSelection.css";

const TradeSelection = () => {
  const [selectedOption, setSelectedOption] = useState("Swap");
  return (
    <div className="trade-selection">
      <Link to="/trade/swap">
        {" "}
        <button
          onClick={() => setSelectedOption("Swap")}
          className={selectedOption === "Swap" ? "active" : ""}
        >
          Swap
        </button>
      </Link>
      <Link to="/trade/limit">
        {" "}
        <button
          onClick={() => setSelectedOption("Limit")}
          className={selectedOption === "Limit" ? "active" : ""}
        >
          Limit
        </button>
      </Link>
      <Link to="/trade/send">
        {" "}
        <button
          onClick={() => setSelectedOption("Send")}
          className={selectedOption === "Send" ? "active" : ""}
        >
          Send
        </button>
      </Link>
      <Link to="/trade/buy">
        <button
          onClick={() => setSelectedOption("Buy")}
          className={selectedOption === "Buy" ? "active" : ""}
        >
          Buy
        </button>
      </Link>
    </div>
  );
};

export default TradeSelection;
