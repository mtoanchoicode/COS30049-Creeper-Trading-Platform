import React, { useContext, useEffect, useState } from "react";
import "./ProfileEstimatedBalance.css";
import Icons from "../Icons/Icons";
import depositIcon from "../../assets/Deposit Icon.svg";
import withdrawIcon from "../../assets/Export Icon.svg";
import { CoinContext } from "../../contexts/CoinContext";

const EstimatedBalance = ({ shortVersion = true }) => {
  const [selectedAsset, setSelectedAsset] = useState("bitcoin");
  const [balance, setBalance] = useState(0.02);
  const [usdValue, setUsdValue] = useState(0);
  const [lastMonthUsdValue, setLastMonthUsdValue] = useState(0);
  const [percentChange, setPercentChange] = useState(0);

  const { coins } = useContext(CoinContext);

  // useEffect(() => {
  //   // Fetch top coins by market cap from CoinGecko
  //   fetch(
  //     "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false"
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setAssets(data);
  //     })
  //     .catch((error) => console.error("Error fetching coin data:", error));
  // }, []);

  // useEffect(() => {
  //   const asset = assets.find((a) => a.name === selectedAsset);
  //   if (asset) {
  //     setUsdValue(balance * asset.price);
  //     const lastMonthValue = (balance * asset.price * 98) / 100; // Example: 2% decrease last month
  //     setLastMonthUsdValue(lastMonthValue);
  //     setPercentChange(((usdValue - lastMonthValue) / lastMonthValue) * 100);
  //   }
  // }, [selectedAsset, balance]);

  const handleAssetChange = (e) => {
    setSelectedAsset(e.target.value);
  };

  return (
    <div
      className={`estimatedBalance-card ${
        shortVersion ? "estimatedBalance-card-shrink" : ""
      }`}
    >
      <div className="estimatedBalance-info">
        <h2>Estimated Balance</h2>
        <div className="estimatedBalance-details">
          <p className="estimatedBalance-balance">{balance}</p>
          <select onChange={handleAssetChange} value={selectedAsset}>
            {coins.map((asset) => (
              <option key={asset.name} value={asset.name}>
                {asset.symbol.toUpperCase()}
              </option>
            ))}
          </select>
          <p>≈ ${usdValue.toFixed(2)}</p>
          <p>
            ${lastMonthUsdValue.toFixed(2)} ({percentChange.toFixed(2)}%) Last
            Month
          </p>
        </div>
      </div>
      {!shortVersion && (
        <div className="estimatedBalance-actions">
          <div className="estimatedBalance-Button">
            <Icons src={depositIcon} />
            <p>Deposit</p>
          </div>
          <div className="estimatedBalance-Button">
            <Icons src={withdrawIcon} />
            <p>Withdraw</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EstimatedBalance;
