import React, { useState, useEffect } from "react";
import { CloseOutlined } from "@ant-design/icons";
import "./ConvertCoinSelection.css";

export const ConvertCoinSelection = ({ handleOverlay, onCoinSelect }) => {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    // Fetch top coins by market cap from CoinGecko
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false"
    )
      .then((response) => response.json())
      .then((data) => {
        setCoins(data);
      })
      .catch((error) => console.error("Error fetching coin data:", error));
  }, []);

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
          {coins.map((coin) => (
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
