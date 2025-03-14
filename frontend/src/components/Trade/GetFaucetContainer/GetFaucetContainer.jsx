import React, { useContext, useEffect, useState } from "react";
import TokensSelection from "../TokensSelection/TokensSelection";
import { CoinContext } from "../../../contexts/CoinContext";
import "./GetFaucetContainer.css";

const GetFaucetContainer = ({ setTokenAddress }) => {
  const { faucetCurrency, setActiveOverlay } = useContext(CoinContext);

  useEffect(() => {
    if (faucetCurrency.address) {
      setTokenAddress(faucetCurrency.address);
    } else {
      setTokenAddress(null);
    }
  }, [faucetCurrency]);

  return (
    <div className="getFaucet-container">
      <div
        className="send-tokens-selection faucet-tokens-selection"
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
