import React from "react";
import ConvertCoinSelection from "../ConvertCoinSelection/ConvertCoinSelection";

const CurrencyOverlay = ({ type, activeOverlay, onClose, onCoinSelect }) => {
  return (
    activeOverlay === type && (
      <ConvertCoinSelection
        handleOverlay={(value) => onClose(type, value)}
        onCoinSelect={onCoinSelect}
      />
    )
  );
};

export default CurrencyOverlay;
