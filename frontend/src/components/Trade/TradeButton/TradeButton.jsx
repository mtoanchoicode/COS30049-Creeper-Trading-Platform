import React, { useContext } from "react";
import "./TradeButton.css";

import swapIcon from "../../../assets/Swap Icon.svg";
import { CoinContext } from "../../../contexts/CoinContext";

const SwapButton = () => {
  const { swapCurrency } = useContext(CoinContext);

  return (
    <div className="convert-currencies-center" onClick={swapCurrency}>
      <img src={swapIcon} alt="Swap icon" title="Swap currencies" />
    </div>
  );
};

export default SwapButton;
