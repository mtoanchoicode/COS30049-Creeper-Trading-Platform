import React, {useState, useContext, useEffect} from "react";
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
    const {coins = []} = useContext(CoinContext);
    const coin = coins.length ? coins.find((coin) => coin.id === coinId) : null;
    const hotCoins = sortArray(coins, "total_volume", "desc").slice(0,7);

    const API_KEY = "CG-dfMn1KtFVaUrUvHBwh5SRFYy"
    const [description, setDescription] = useState("");
    const [descriptionError, setDescriptionError] = useState(false)
    const [descriptionLoading, setDescriptionLoading] = useState(true)

    const [showFullText, setShowFullText] = useState(false);
    const shortDescription = description.slice(0,150) + "...";

    useEffect(() => {
      const fetchDescription = async () => {
        if (!coin){
          return;
        }
        try{
          setDescriptionLoading(true);
          const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`);          if (!response.ok) throw new Error("failed to fetch coin description")

          const data = await response.json()
          setDescription(data.description?.en || "No description available")
        }catch{
          console.error("Error fetching coin description:", err);
          setDescriptionError(true);
        }finally{
          setDescriptionLoading(false);
        }
      }

      fetchDescription()
    }, [coinId]);

  
    function sortArray(arrayToSort = [], keyToSort, direction){
      if (!arrayToSort.length) return []; // Return an empty array if there's no data
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
                    {descriptionLoading?(
                      <p className="coin-details-intro-description">Loading description...</p>
                    ):descriptionError?(
                      <p className="coin-details-intro-description">Failed to load description.</p>
                    ):(
                      <>
                        <p className="coin-details-intro-description">{showFullText?description:shortDescription}</p>
                        <div className="coin-details-intro-show-more" onClick={()=>handleShowText()}>
                          {showFullText ? "Show less": "Show more"}
                        </div>
                      </>
                    )}
                    
                    
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