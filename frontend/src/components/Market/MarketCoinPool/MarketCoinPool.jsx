import MarketSortButton from "../MarketSortButton/MarketSortButton";
import MarketCoinFull from "../MarketCoinFull/MarketCoinFull"
import React, {useState, useContext} from "react";
import "./MarketCoinPool.css"
import { CoinContext } from "../../../contexts/CoinContext";


function MarketCoinPool(){
    const [sort, setSort] = useState({keyToSort: "current_price", direction: "desc"});
    const {coins} = useContext(CoinContext);

    function handleSortClick(key){
        setSort({
          keyToSort: key,
          direction: 
            key === sort.keyToSort ? 
              sort.direction === "asc" ?
                 "desc" : 
                 "asc" : 
              "desc"
        });
      }
    
      function sortArray(arrayToSort){
        if (sort.direction === "asc"){
          return arrayToSort.sort((a, b) => (a[sort.keyToSort] > b[sort.keyToSort] ? 1 : -1));
        }
        return arrayToSort.sort((a, b) => (a[sort.keyToSort] > b[sort.keyToSort] ?-1 : 1));
      }

    return(
        <div className="market-coin-pool">
        <div className="market-coin-pool-headers">
          <h2 className="pool-header pool-header-name" onClick={() => handleSortClick("name")}>
            <span>Name</span>
            <MarketSortButton
                isSelected = {sort.keyToSort === "name" && "isSelected"}
                direction = {sort.keyToSort === "name" && sort.direction}
              />
          </h2>
          {/* Table headers */}
          <div className="pool-headers-prices">
            <h2 className="pool-header" onClick={() => handleSortClick("current_price")}> 
              <span>Price</span> 
              <MarketSortButton
                isSelected = {sort.keyToSort === "current_price" && "isSelected"}
                direction = {sort.keyToSort === "current_price" && sort.direction}
              />
            </h2> 
            <h2 className="pool-header" onClick={() => handleSortClick("price_change_percentage_24h")}>
              <span>24H Change</span> 
              <MarketSortButton
                isSelected = {sort.keyToSort === "price_change_percentage_24h" && "isSelected"}
                direction = {sort.keyToSort === "price_change_percentage_24h" && sort.direction}
              />
            </h2> 
            <h2 className="pool-header" onClick={() => handleSortClick("total_volume")}>
              <span>Volume</span>
              <MarketSortButton
                isSelected = {sort.keyToSort === "total_volume" && "isSelected"}
                direction = {sort.keyToSort === "total_volume" && sort.direction}
              />
            </h2> 
            <h2 className="pool-header" onClick={() => handleSortClick("market_cap")}>
              <span>Market Cap</span>
              <MarketSortButton
                isSelected = {sort.keyToSort === "market_cap" && "isSelected"}
                direction = {sort.keyToSort === "market_cap" && sort.direction}
              />
            </h2> 
          </div>
        </div>
        
        {/* Table rows */}
        {sortArray(coins).map(coin =>(
          <MarketCoinFull
            key={coin.id}
            id={coin.id}
            name={coin.name}
            symbol={coin.symbol.toUpperCase()}
            current_price={coin.current_price}
            change = {coin.price_change_percentage_24h}
            image={coin.image}
            volume={coin.total_volume}
            market_cap={coin.market_cap}
          />
      ))}
      </div>
    );
}

export default MarketCoinPool