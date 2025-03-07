import React, { useContext } from "react";
import { CloseOutlined } from "@ant-design/icons";
import "./TokensSelection.css";
import { CoinContext } from "../../../contexts/CoinContext";

const TokensSelection = ({ type, tradeType }) => {
  const { localCoins, activeOverlay, setActiveOverlay, handleCoinSelection } =
    useContext(CoinContext);

  const filteredCoins = type === "faucet" ? localCoins.slice(1) : localCoins;
  return (
    activeOverlay === type && (
      <div className="convert-coin-selection">
        <div className="convert-coin-selection-container">
          <div className="convert-coin-selection-container-top">
            <p>Select a token</p>
            <div
              className="convert-coin-selection-container-close"
              onClick={() => setActiveOverlay(null)}
            >
              <CloseOutlined />
            </div>
          </div>
          <div className="convert-coin-selection-container-list">
            {filteredCoins.map((coin) => (
              <div
                key={coin.name}
                className="selection-coin-item"
                onClick={() => handleCoinSelection(coin, type, tradeType)}
              >
                <img
                  src={coin.image}
                  alt={coin.name}
                  className="selection-coin-icon"
                />
                <div className="selection-coin-main">
                  <div className="selection-coin-header">
                    <p className="selection-coin-title">{coin.name}</p>
                    <p className="selection-coin-symbol">
                      {coin.symbol.toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default TokensSelection;
