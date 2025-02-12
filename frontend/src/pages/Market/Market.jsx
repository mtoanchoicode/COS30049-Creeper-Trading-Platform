import React, { useContext } from "react";
import MarketTitle from "../../components/Market/MarketTitle/MarketTitle";
import MarketCoinBrief from "../../components/Market/MarketCoinBrief/MarketCoinBrief";
import MarketCoinPool from "../../components/Market/MarketCoinPool/MarketCoinPool";
import { CoinContext } from "../../contexts/CoinContext";
import './Market.css';
import { Link, Links } from "react-router-dom";


const MarketPage = () => {
  const {coins} = useContext(CoinContext);

  function sortArray(arrayToSort, keyToSort, direction){
    if (direction === "asc"){
      return arrayToSort.sort((a, b) => (a[keyToSort] > b[keyToSort] ? 1 : -1)); 
    }
    return arrayToSort.sort((a, b) => (a[keyToSort] > b[keyToSort] ?-1 : 1));
  }

  const hotCoins = sortArray(coins, "total_volume", "desc").slice(0,7);
  const topGains = sortArray(coins, "price_change_percentage_24h", "desc").slice(0, 3);
  const topLosses = sortArray(coins, "price_change_percentage_24h", "asc").slice(0, 3);


  return (
    <div className="market-page">
      <div className="market-landing">
        <MarketTitle></MarketTitle> 

        <div className="market-overview">
          <h2 className="market-overview-title">Market Overview</h2>
          <div className="market-overview-content">
            <div className = "market-hot-coins">
              <h3>Hot Coins</h3>
              {hotCoins.map(coin =>(
                 
                  <MarketCoinBrief className="hot-coins-listing"
                    key={coin.id}
                    id={coin.id}
                    name={coin.name}
                    symbol={coin.symbol.toUpperCase()}
                    current_price={coin.current_price}
                    image={coin.image}
                    change={coin.price_change_percentage_24h}
                  />
                
              ))}
            </div>

            <div className="top-gains-new-listing">
              <div className="market-top-gains">
                <h3>Top Gains</h3>
                {topGains.map(coin =>(
                <MarketCoinBrief
                  key={coin.id}
                  id={coin.id}
                  name={coin.name}
                  symbol={coin.symbol.toUpperCase()}
                  current_price={coin.current_price}
                  image={coin.image}
                  change={coin.price_change_percentage_24h}
                />
              ))}
              </div>

              <div className = "market-top-losses">
                <h3>Top Losses</h3>
                {topLosses.map(coin =>(
                  <MarketCoinBrief 
                    key={coin.id}
                    id={coin.id}
                    name={coin.name}
                    symbol={coin.symbol.toUpperCase()}
                    current_price={coin.current_price}
                    image={coin.image}
                    change={coin.price_change_percentage_24h}
                  />
                ))}
              </div>
              
            </div>
          </div>
        </div>
      </div>
      <MarketCoinPool/>
    </div>
    
    
  );
};

export default MarketPage;
