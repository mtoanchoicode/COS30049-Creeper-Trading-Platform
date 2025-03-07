import React, { useContext, useState } from "react";
import TokensSelection from "../TokensSelection/TokensSelection";
import { CoinContext } from "../../../contexts/CoinContext";

const GetFaucetContainer = ({ setTokenAddress }) => {
  const {
    sendCurrency,
    setActiveOverlay,
    sendTokenAddress,
    setSendTokenAddress,
  } = useContext(CoinContext);
  return (
    <div className="getFaucet-container">
      <div className="getFaucet-top">
        <span>You're getting Faucet</span>
      </div>
      <div
        className="send-tokens-selection"
        onClick={() => setActiveOverlay("send")}
      >
        <div className="send-tokens-selection-coin">
          <img
            src={sendCurrency.image}
            alt={sendCurrency.symbol.toUpperCase()}
          />
          <p>{sendCurrency.symbol.toUpperCase()}</p>
        </div>
        <div className="send-tokens-selection-icon">
          <i className="fa-solid fa-chevron-down"></i>
        </div>
      </div>
      <TokensSelection type="send" tradeType="send" />
    </div>
  );
};

export default GetFaucetContainer;
