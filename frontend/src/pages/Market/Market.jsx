import React from "react";
import MarketTitle from "../../components/MarketTitle/MarketTitle";
import MarketCoinBrief from "../../components/MarketCoins/MarketCoinBrief/MarketCoinBrief";
import coinData from '../../data/coins.json';
import './Market.css';

const MarketPage = () => {
  const bitcoin = coinData.slice(0,3);
  return (
    <div className="market-page">
      <MarketTitle></MarketTitle> 
      {bitcoin.map(coin =>(
        <MarketCoinBrief
          id={coin.id}
          name={coin.name}
          symbol={coin.symbol}
          current_price={coin.current_price}
          image={coin.image}
        />
      ))
      }
    </div>
    
  );
};

export default MarketPage;
