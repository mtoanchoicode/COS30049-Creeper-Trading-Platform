import React, { useContext } from "react";
import "./ConvertListCoins.css";
import { CoinContext } from "../../../contexts/CoinContext";

export const ConvertListCoins = () => {
   const { coins, handleCoinSelection } = useContext(CoinContext);

  return (
    <div className="convert-list-coins">
      <div className="convert-list-coins-header">
        <p className="convert-list-coins-name">Name</p>
        <p className="convert-list-coins-price">Price</p>
      </div>
      <div className="convert-list">
        {coins.slice(0,20).map((coin) => (
          <div key={coin.id} className="coin-item" onClick={() => handleCoinSelection(coin, "to")}>
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
