import React, { useState, useEffect, useContext } from "react";
import { CloseOutlined } from "@ant-design/icons";
import "./CurrencySelectOverlay.css";
import { CoinContext } from "../../contexts/CoinContext";

export const ConvertCoinSelection = ({ handleOverlay, onCoinSelect }) => {
  const { coins } = useContext(CoinContext);

  return (
    <div className="convert-coin-selection">
      <div className="convert-coin-selection-container">
        <div className="convert-coin-selection-container-top">
          <p>Select Currency</p>
          <div
            className="convert-coin-selection-container-close"
            onClick={() => handleOverlay(false)}
          >
            <CloseOutlined />
          </div>
        </div>
        <div className="convert-coin-selection-container-list">
          {coins.slice(0,10).map((coin) => (
            <div
              key={coin.id}
              className="selection-coin-item"
              onClick={() => onCoinSelect(coin)}
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
                <div className="selection-coin-price">
                  <p>${coin.current_price.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConvertCoinSelection;
