import React, { useContext, useState, useEffect, useRef } from "react";
import "./CoinDetailsOverview.css";
import TradeChart from "../../../../assets/Trade-Chart.jpg";
import FavoriteStar from "../../FavoriteStar/FavoriteStar";
import { AuthContext } from "../../../../contexts/AuthContext";
import {Line} from "react-chartjs-2";
import 'chart.js/auto';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title } from 'chart.js';
import HistoricalChart from "../../../../config/historic_chart";
import axios from 'axios';

ChartJS.register(LineElement, PointElement, LinearScale, Title);

function CoinDetailsOverview(props) {
  const { auth } = useContext(AuthContext);
  const coin = props.coin;
  const [period, setPeriod] = useState("1D");

  //Drawing the chart
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1)
  const currency = "usd"

  const fetchHistoricalData = async () => {
    const {data} = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistoricalData(data.prices)
  };
  
  useEffect(() => {
    fetchHistoricalData();
  }, [coin.id, days, currency])


  //Extend later to show chart according to period of time
  function handlePeriodClick(selectedPeriod) {
    setPeriod(selectedPeriod);
    switch(selectedPeriod){
      case "1H":
        setDays(1/24);
        break;
      case "1D":
        setDays(1);
        break;
      case "1W":
        setDays(7);
        break;
      case "1M":
        setDays(30);
        break;
      case "1Y":
        setDays(365);
        break;
    }
  }
  
  const handleFluctuation = (change) => {
    return Number(change) >= 0 ? (
      <div className="coin-details-fluctuation coin-details-upward-fluctuation">
        {"+" + Number(change).toFixed(2) + "%"}
      </div>
    ) : (
      <div className="coin-details-fluctuation coin-details-downward-fluctuation">
        {Number(change).toFixed(2) + "%"}
      </div>
    );
  };

  const handleMoney = (money) => {
    money = Number(money);
    if (money >= 1_000_000_000) {
      return "$" + (money / 1_000_000_000).toFixed(2) + "B";
    }
    if (money >= 1_000_000) {
      return "$" + (money / 1_000_000).toFixed(2) + "M";
    } else if (money >= 1_000) {
      return "$" + (money / 1_000).toFixed(2) + "K";
    }
    return "$" + money.toFixed(2);
  };

  return (
    <div className="coin-details-overview">
      <div className="coin-details-overview-logo">
        <img
          className="coin-details-overview-img"
          src={coin.image}
          alt={"logo of" + coin.name}
        />
        <h2 className="coin-details-overview-symbol">
          {coin.symbol.toUpperCase()}
        </h2>
        <p className="coin-details-overview-name">{coin.name}</p>
        {auth.isAuthenticated ? (
          <FavoriteStar coinSymbol={coin.symbol}></FavoriteStar>
        ) : (
          ""
        )}
      </div>
      <div className="coin-details-overview-price-period">
        <h2>{handleMoney(coin.current_price)}</h2>
        <div className="price-period-selection-container">
          <span
            onClick={() => handlePeriodClick("1H")}
            className={`price-period-selection ${
              period === "1H" && "price-period-selected"
            }`}
          >
            1H
          </span>
          <span
            onClick={() => handlePeriodClick("1D")}
            className={`price-period-selection ${
              period === "1D" && "price-period-selected"
            }`}
          >
            1D
          </span>
          <span
            onClick={() => handlePeriodClick("1W")}
            className={`price-period-selection ${
              period === "1W" && "price-period-selected"
            }`}
          >
            1W
          </span>
          <span
            onClick={() => handlePeriodClick("1M")}
            className={`price-period-selection ${
              period === "1M" && "price-period-selected"
            }`}
          >
            1M
          </span>
          <span
            onClick={() => handlePeriodClick("1Y")}
            className={`price-period-selection ${
              period === "1Y" && "price-period-selected"
            }`}
          >
            1Y
          </span>
        </div>
      </div>
      <div className="coin-details-overview-chart-container">
        {handleFluctuation(coin.price_change_percentage_24h)}
        <div className="coin-details-overview-chart">

          {/* <img src={TradeChart} alt="Trade chart" /> */}
          {
            !historicalData ? (
              <div>Loading</div>
            ):
            (
              <Line className="coin-details-line-chart"
                key={days}
                data={{
                  labels: historicalData.map((coin) => {
                    let date = new Date(coin[0]);
                    let time = date.getHours() > 12
                    ? `${(date.getHours() - 12).toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')} PM`
                    : `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')} AM` ;

                    return days <= 1? time : date.toLocaleDateString()
                  }),
                  datasets: [
                    {
                      data: historicalData.map((coin) => coin[1]),
                      label: days === 1/24
                      ?`Price (Past 1 Hours) in USD`
                      :`Price (Past ${days} Days) in ${currency.toUpperCase()}`,
                      borderColor: "#00A04A",
                      borderWidth: days <= 1? 2: 1.5,
                      tension: days === 1/24? 0: 0.2
                    }
                  ]
                }}
                options = {{
                  responsive: true,
                  scales:{
                    y:{
                      ticks:{
                        callback: function (value){
                          return handleMoney(value);
                        }
                      },
                      grid:{
                        display: false
                      }
                    },
                    x:{
                      grid:{
                        display:false
                      }
                    }
                  },
                  maintainAspectRatio: false,
                  elements:{
                    point:{
                      radius: 0
                    }
                  },
                }}
              />
            )
          }

        </div>
      </div>
    </div>
  );
}

export default CoinDetailsOverview;
