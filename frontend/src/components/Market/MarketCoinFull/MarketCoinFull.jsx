import React from "react";
import './MarketCoinFull.css';

function MarketCoinFull(props){
    const handleFluctuation = (change) => {
        return Number(change) >= 0?
        <div className="full-coin-fluctuation full-upward-fluctuation">{"+"+Number(change).toFixed(2)+"%"}</div>:
        <div className="full-coin-fluctuation full-downward-fluctuation">{Number(change).toFixed(2)+"%"}</div>;
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
                

                {handleFluctuation(props.change)} 

                <div className="full-coin-volume">
                    {handleMoney(props.volume)}
                </div>

                <div className="full-coin-market-cap">
                    {handleMoney(props.market_cap)}
                </div>
            </div>
            
        </div>
    );
}

export default MarketCoinFull