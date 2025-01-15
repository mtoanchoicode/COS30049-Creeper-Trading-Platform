import React, { useEffect, useState } from "react";
import "./ConvertListCoins.css";

export const ConvertListCoins = () => {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    // Fetch top coins by market cap from CoinGecko
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false"
    )
      .then((response) => response.json())
      .then((data) => {
        setCoins(data);
      })
      .catch((error) => console.error("Error fetching coin data:", error));
  }, []);

  return (
    <div className="convert-list-coins">
      <div className="convert-list-coins-header">
        <p className="convert-list-coins-name">Name</p>
        <p className="convert-list-coins-price">Price</p>
      </div>
      <div className="convert-list">
        {coins.map((coin) => (
          <div key={coin.id} className="coin-item">
            <img src={coin.image} alt={coin.name} className="coin-icon" />
            <div className="coin-main">
              <div className="coin-header">
                <p className="coin-title">{coin.name}</p>
                <p className="coin-symbol">{coin.symbol.toUpperCase()}</p>
              </div>
              <div className="coin-price">
                <p>${coin.current_price.toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
