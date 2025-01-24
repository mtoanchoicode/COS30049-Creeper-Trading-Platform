import React from "react";
import './MarketCoinFull.css';

function MarketCoinFull(props){
    // Coin's price change will be updated with real-time data in a later stage of the project
    const fluctuation = (Math.random() * 20 - 10).toFixed(2);
    const handleFluctuation = () => {
        return fluctuation >= 0?
        <div className="full-coin-fluctuation full-upward-fluctuation">{"+"+fluctuation+"%"}</div>:
        <div className="full-coin-fluctuation full-downward-fluctuation">{"-"+fluctuation+"%"}</div>;
    }
    const handleMoney = (money) => {
        money = Number(money);
        if (money >= 1_000_000_000){
            return "$" + (money/1_000_000_000).toFixed(2) + "B";
        }
        if (money >= 1_000_000){
            return "$" + (money/1_000_000).toFixed(2) + "M";
        }
        else if(money >= 1_000){
            return "$" + (money/1_000).toFixed(2) + "K";
        }
        return "$" + money.toFixed(2);
    }

    return(
        <div className="market-coin-full">
            <div className="full-coin-logo">
                <img className="full-coin-img" src={props.image} alt={"logo of" + props.name} />
                <h2 className="full-coin-symbol">{props.symbol}</h2>
                <p className="full-coin-name">{props.name}</p>
            </div>
            <div className="full-coin-prices">
                <div className="full-coin-current">
                    {handleMoney(props.current_price)}
                </div>
                
                {handleFluctuation()} 

                <div className="full-coin-max-trans">
                    {handleMoney(props.max_trans)}
                </div>

                <div className="full-coin-market-cap">
                    {handleMoney(props.market_cap)}
                </div>
            </div>
            
        </div>
    );
}

export default MarketCoinFull