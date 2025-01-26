import React, { useContext } from "react";
import MarketTitle from "../../components/Market/MarketTitle/MarketTitle";
import MarketCoinBrief from "../../components/Market/MarketCoinBrief/MarketCoinBrief";
import MarketCoinFull from "../../components/Market/MarketCoinFull/MarketCoinFull";
import coinData from '../../data/coins.json';
import './Market.css';
import { CoinContext } from "../../contexts/CoinContext";
import MarketSortButton from "../../components/Market/MarketSortButton/MarketSortButton";

const MarketPage = () => {
  const {coins} = useContext(CoinContext);

  const hotCoins = coins.slice(0,7);
  const topGains = coins.slice(0,3);
  const topLosses = coins.slice(0,3);
  const fullCoins2 = coins.slice(20,35);

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
                  id={coin.id}
                  name={coin.name}
                  symbol={coin.symbol.toUpperCase()}
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
                    symbol={coin.symbol.toUpperCase()}
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
                    symbol={coin.symbol.toUpperCase()}
                    current_price={coin.current_price}
                    image={coin.image}
                  />
                ))}
              </div>
              
            </div>
          </div>
        </div>
      </div>
      <div className="market-coin-pool">
        <div className="market-coin-pool-headers">
          <h2 className="pool-header">Name</h2>
          {/* Table headers */}
          <div className="pool-headers-prices">
            <h2 className="pool-header">
              Price 
              <MarketSortButton></MarketSortButton>
            </h2> 
            <h2 className="pool-header">
              Change 
              <MarketSortButton></MarketSortButton>
            </h2> 
            <h2 className="pool-header">
              Max Transaction 
              <MarketSortButton></MarketSortButton>
            </h2> 
            <h2 className="pool-header">
              Market Cap 
              <MarketSortButton></MarketSortButton>
            </h2> 
          </div>
        </div>
        
        {/* Table rows */}
        {coins.map(coin =>(
          <MarketCoinFull
            id={coin.id}
            name={coin.name}
            symbol={coin.symbol.toUpperCase()}
            current_price={coin.current_price}
            image={coin.image}
            max_trans={coin.max_transaction_amount}
            market_cap={coin.market_cap}
          />
      ))}
      </div>
      
    </div>
    
    
  );
};

export default MarketPage;
