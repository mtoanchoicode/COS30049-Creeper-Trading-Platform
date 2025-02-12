import React, {useContext} from "react";
import "./CoinDetailsInfo.css"

const CoinDetailsInfo = (preps) =>{
    var coin = preps.coin;

    const handleLargeNumber = (number, isMoney = false) => {
        number = Number(number);
        if (number >= 1_000_000_000){
            var result = (number/1_000_000_000).toFixed(2) + "B";
        }
        else if (number >= 1_000_000){
            var result = (number/1_000_000).toFixed(2) + "M";
        }
        else if(number >= 1_000){
            var result = (number/1_000).toFixed(2) + "K";
        }   
        else{
            var result = number.toFixed(2);
        }
        return isMoney? "$" + result: result;
    }

    return(
        <div className="coin-details-info-container">
            <h2 className="coin-details-info-heading">{coin.symbol.toUpperCase()} Market Information </h2>
            <div className="coin-details-info">
                <div>
                    <h3>Market Cap Rank</h3>
                    <p>Top {coin.market_cap_rank}</p>
                </div>
                <div>
                    <h3>Market Cap</h3>
                    <p>{handleLargeNumber(coin.market_cap, true)}</p>
                </div>
                <div>
                    <h3>Volume</h3>
                    <p>{handleLargeNumber(coin.total_volume, true)}</p>
                </div>
                <div>
                    <h3>Circulating Supply</h3>
                    <p>{handleLargeNumber(coin.circulating_supply)}</p>
                </div>
                <div>
                    <h3>Total Supply</h3>
                    <p>{handleLargeNumber(coin.total_supply)}</p>
                </div>
                <div>
                    <h3>Fully Diluted Valuation</h3>
                    <p>{handleLargeNumber(coin.fully_diluted_valuation, true)}</p>
                </div>
                <div>
                    <h3>Last Updated</h3>
                    <p>{coin.last_updated.slice(0,10)}</p>
                </div>
            </div>
        </div>
    );
}

export default CoinDetailsInfo