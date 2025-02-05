import React, {useState} from "react";
import "./CoinDetailsOverview.css"


function CoinDetailsOverview(props){
    const coin = props.coin;
    const [period, setPeriod] = useState("1D")

    //Extend later to show chart according to period of time
    function handlePeriodClick(selectedPeriod){
        setPeriod(selectedPeriod)
    }
    const handleFluctuation = (change) => {
        return Number(change) >= 0?
        <div className="coin-details-fluctuation coin-details-upward-fluctuation">{"+"+Number(change).toFixed(2)+"%"}</div>:
        <div className="coin-details-fluctuation coin-details-downward-fluctuation">{Number(change).toFixed(2)+"%"}</div>;
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
        <div className="coin-details-overview">
            <div className="coin-details-overview-logo">
                <img className="coin-details-overview-img" src={coin.image} alt={"logo of" + coin.name} />
                <h2 className="coin-details-overview-symbol">{coin.symbol.toUpperCase()}</h2>
                <p className="coin-details-overview-name">{coin.name}</p>
            </div>
            <div className="coin-details-overview-price-period">
                <h2>{handleMoney(coin.current_price)}</h2>
                <div className="price-period-selection-container">
                    <span onClick={() => handlePeriodClick("1H")} className = {`price-period-selection ${period === "1H" && "price-period-selected"}`}>
                        1H
                    </span>
                    <span onClick={() => handlePeriodClick("1D")} className = {`price-period-selection ${period === "1D" && "price-period-selected"}`}>
                        1D
                    </span>
                    <span onClick={() => handlePeriodClick("1W")} className = {`price-period-selection ${period === "1W" && "price-period-selected"}`}>
                        1W
                    </span>
                    <span onClick={() => handlePeriodClick("1M")} className = {`price-period-selection ${period === "1M" && "price-period-selected"}`}>
                        1M
                    </span>
                    <span onClick={() => handlePeriodClick("1Y")} className = {`price-period-selection ${period === "1Y" && "price-period-selected"}`}>
                        1Y
                    </span>
                    
                </div>
            </div>
            <div className="coin-details-overview-chart-container">
                {handleFluctuation(coin.price_change_percentage_24h)}
                <div className="coin-details-overview-chart"></div>
            </div>
        </div>
    );
}

export default CoinDetailsOverview