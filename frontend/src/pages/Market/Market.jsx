import React from "react";
import MarketTitle from "../../components/MarketTitle/MarketTitle";
import MarketCoinBrief from "../../components/MarketCoins/MarketCoinBrief/MarketCoinBrief";
import coinData from '../../data/coins.json';
import './Market.css';

const MarketPage = () => {
  const hotCoins = coinData.slice(0,7);
  const topGains = coinData.slice(0,3);
  const topLosses = coinData.slice(0,3);

  return (
    <div className="market-page">
      <MarketTitle></MarketTitle> 

      <div className="market-overview">
        <h2 className="market-overview-title">Market Overview</h2>
        <div className="market-overview-content">
          <div className = "market-hot-coins">
            <h3>Hot Coins</h3>
            {hotCoins.map(coin =>(
              <MarketCoinBrief className="hot-coins-listing"
                id={coin.id}
                name={coin.name}
                symbol={coin.symbol}
                current_price={coin.current_price}
                image={coin.image}
              />
            ))}
          </div>

          <div className="top-gains-new-listing">
            <div className="market-top-gains">
              <h3>Top Gains</h3>
              {topGains.map(coin =>(
                <MarketCoinBrief 
                  id={coin.id}
                  name={coin.name}
                  symbol={coin.symbol}
                  current_price={coin.current_price}
                  image={coin.image}
                />
              ))}
            </div>

            <div className = "market-top-losses">
              <h3>Top Losses</h3>
              {topLosses.map(coin =>(
                <MarketCoinBrief 
                  id={coin.id}
                  name={coin.name}
                  symbol={coin.symbol}
                  current_price={coin.current_price}
                  image={coin.image}
                />
              ))}
            </div>
            
          </div>
        </div>
      </div>
      
    </div>
    
  );
};

export default MarketPage;
