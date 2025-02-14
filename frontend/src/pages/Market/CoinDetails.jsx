import React, {useState, useContext} from "react";
import { CoinContext } from "../../contexts/CoinContext";
import { Link, useParams } from "react-router-dom";
import notFoundImg from "../../assets/404 Image.svg";
import CoinDetailsOverview from "../../components/Market/CoinDetails/CoinDetailsOverview/CoinDetailsOverview";
import CoinDetailsInfo from "../../components/Market/CoinDetails/CoinDetailsInfo/CoinDetailsInfo"
import MarketCoinBrief from "../../components/Market/MarketCoinBrief/MarketCoinBrief";
import Swap from "../../pages/Trade/Swap";
import "./CoinDetails.css";

const CoinDetails = () =>{
    const {coinId} = useParams();
    const {coins} = useContext(CoinContext);
    const coin = coins.find((coin) => coin.id === coinId);
    const hotCoins = sortArray(coins, "total_volume", "desc").slice(0,7);

    const [showFullText, setShowFullText] = useState(false);
    const fullText = "Bitcoin (BTC) is the first decentralized digital currency, launched in 2009 by Satoshi Nakamoto. It operates on a peer-to-peer network using blockchain technology, allowing secure and transparent transactions without intermediaries. Bitcoin is a store of value and a medium of exchange, often referred to as \"digital gold.\" With a fixed supply of 21 million coins, it is designed to be deflationary. Transactions are verified through mining, where computers solve cryptographic puzzles. Bitcoin wallets are easy to set up, with popular options like Electrum, Ledger, and Trezor";
    const shortText = fullText.slice(0,150) + "...";

    function sortArray(arrayToSort, keyToSort, direction){
      if (direction === "asc"){
        return arrayToSort.sort((a, b) => (a[keyToSort] > b[keyToSort] ? 1 : -1)); 
      }
      return arrayToSort.sort((a, b) => (a[keyToSort] > b[keyToSort] ?-1 : 1));
    }

    function handleShowText(){
      setShowFullText(!showFullText);
      console.log(showFullText);
    }

    return (
        <div>
          {coin ? (
          // Shows details of coin if found in coin list
            <div>
              <div className="coin-details-upper">
                <CoinDetailsOverview coin={coin}/>
                <div className="coin-details-upper-right">
                  <div className="coin-details-swap">
                    <Swap/>
                  </div>
                  <div className="coin-details-intro">
                    <h2 className="coin-details-intro-heading">Info</h2>
                    <p className="coin-details-intro-description">{showFullText?fullText:shortText}</p>
                    <div className="coin-details-intro-show-more" onClick={()=>handleShowText()}>
                      {showFullText ? "Show less": "Show more"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="coin-details-lower">
                <CoinDetailsInfo coin={coin} />
                <div className = "coin-details-hot-coins">
                  <h3>Hot Coins</h3>
                  {hotCoins.map(coin =>(
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
          // Shows an error page if coin not found (accessed through search bar)
          ) : (
            <div className="coin-not-found-container">
                <img className="not-found-img" src={notFoundImg} alt="404 Not Found Image" />
                <h1>Coin Not Found</h1>
                <Link to={`/explore`}>
                    <p className="return-to-explore">Return to Explore</p>
                </Link>
            </div>
          )}
        </div>
      );
}

export default CoinDetails