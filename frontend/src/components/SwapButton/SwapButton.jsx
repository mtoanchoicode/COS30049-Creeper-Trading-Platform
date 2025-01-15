import React from "react";
import swapIcon from "../../assets/Swap Icon.svg";
import "./SwapButton.css"

const SwapButton = ({ onClick }) => (
  <div className="convert-currencies-center" onClick={onClick}>
    <img src={swapIcon} alt="Swap icon" title="Swap currencies" />
  </div>
);

export default SwapButton;
