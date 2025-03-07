import React, { useContext, useState } from "react";
import TokensSelection from "../TokensSelection/TokensSelection";
import { CoinContext } from "../../../contexts/CoinContext";

const GetFaucetContainer = ({ setTokenAddress }) => {
  const {
    faucetCurrency,
    setActiveOverlay,
    sendTokenAddress,
    setSendTokenAddress,
  } = useContext(CoinContext);
  return (
    <div className="getFaucet-container">
      <div
        className="send-tokens-selection"
        onClick={() => setActiveOverlay("faucet")}
      >
        <div className="send-tokens-selection-coin">
          <img
            src={faucetCurrency.image}
            alt={faucetCurrency.symbol.toUpperCase()}
          />
          <p>{faucetCurrency.symbol.toUpperCase()}</p>
        </div>
        <div className="send-tokens-selection-icon">
          <i className="fa-solid fa-chevron-down"></i>
        </div>
      </div>
      <TokensSelection type="faucet" tradeType="faucet" />
    </div>
  );
};

export default GetFaucetContainer;
