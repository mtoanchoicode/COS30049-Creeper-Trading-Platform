import "./MarketCoinBrief.css";
import { Link } from "react-router-dom";
import FavoriteStar from "../FavoriteStar/FavoriteStar";

function MarketCoinBrief(props) {
  const handleFluctuation = (change) => {
    return Number(change) >= 0 ? (
      <div className="market-coin-fluctuation upward-fluctuation">
        {"+" + Number(change).toFixed(2) + "%"}
      </div>
    ) : (
      <div className="market-coin-fluctuation downward-fluctuation">
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
    <Link to={`/explore/${props.id}`} key={props.id}>
      <div className="market-coin-brief">
        <div className="market-coin-logo">
          <img
            className="market-coin-img"
            src={props.image}
            alt={"logo of" + props.name}
          />
          <h2 className="market-coin-symbol">{props.symbol}</h2>
        </div>
        <div className="market-coin-prices">
          <div className="market-coin-current">
            {handleMoney(props.current_price)}
          </div>
          {handleFluctuation(props.change)}
        </div>
      </div>
    </Link>
  );
}

export default MarketCoinBrief;
