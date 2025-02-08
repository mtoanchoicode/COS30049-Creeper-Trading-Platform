import React, { useContext } from "react";
import { CloseOutlined } from "@ant-design/icons";
import "./TokensSelection.css";
import { CoinContext } from "../../../contexts/CoinContext";

export const TokensSelection = ({ type, tradeType }) => {
  const { coins, activeOverlay, setActiveOverlay, handleCoinSelection } =
    useContext(CoinContext);

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
          <div className="convert-selection-container-center">
            <div className="convert-selection-searchbar">
              <div className="convert-selection-searchbar-container">
                <div className="convert-selection-searchbar-icon">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </div>
                <div className="convert-selection-searchbar-text">
                  <p>Search tokens</p>
                </div>
              </div>
            </div>
          </div>
          <div className="convert-coin-selection-container-list">
            {coins.map((coin) => (
              <div
                key={coin.id}
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
