import React from "react";
import './MarketCoinBrief.css';

function MarketCoinBrief(props){
    // Coin's price change will be updated with real-time data in a later stage of the project
    const fluctuation = (Math.random() * 20 - 10).toFixed(2);
    const handleFluctuation = () => {
        return fluctuation >= 0?
        <div className="market-coin-fluctuation upward-fluctuation">{"+"+fluctuation+"%"}</div>:
        <div className="market-coin-fluctuation downward-fluctuation">{"-"+fluctuation+"%"}</div>;
    }
    

    return(
        <div className="market-coin-brief">
            <div className="market-coin-logo">
                <img className="market-coin-img" src={props.image} alt={"logo of" + props.name} />
                <h2 className="market-coin-symbol">{props.symbol}</h2>
            </div>
            <div className="market-coin-prices">
                <div className="market-coin-current">
                    {props.current_price >= 1000.00?
                    "$" + (props.current_price/1000).toFixed(2) + "K":
                    "$" + (props.current_price).toFixed(2)}
                </div>
                {handleFluctuation()}
            </div>
            
        </div>
    );
}

export default MarketCoinBrief