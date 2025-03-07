import React, { useState, useContext, useEffect } from "react";
import CoinProvider, { CoinContext } from "../../contexts/CoinContext";
import CloseIcon from "../../assets/X Close Icon.svg";
import MobileNav from "../NavBar/MobileNavBar"
import searchIcon from "../../assets/Market Search Icon.svg";
import "./CoinSearchInput.css";
import { Link, useNavigate } from "react-router-dom";


const CoinSearchInput = ({onEvent}) => {
  const [search, setSearch] = useState("");
  const { coins } = useContext(CoinContext);
  const [selectedCoin, setSelectedCoin] = useState(0);
  const navigate = useNavigate();
  

  useEffect(() => {
    setSelectedCoin(0); // Reset selected coin when search changes
  }, [search]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleClose = () => {
    setSearch("");
  };

  const handleCoinClick = () => {
    // setTimeout(() => {
    //   onCloseSearch(false);
    // }, 100); 
    onEvent();
  };

  const handleKeyDown = (e) => {
    if (selectedCoin < filteredCoins.length) {
      if (e.key === "ArrowUp" && selectedCoin > 0) {
        setSelectedCoin((prev) => prev - 1);
      } else if (
        e.key === "ArrowDown" &&
        selectedCoin < filteredCoins.length - 1
      ) {
        setSelectedCoin((prev) => prev + 1);
      } else if (e.key === "Enter" && selectedCoin >= 0) {
        navigate(`/explore/${filteredCoins[selectedCoin].id}`);
      }
    }
  };

  const filteredCoins =
    search !== ""
      ? coins.filter(
          (coin) =>
            coin.name.toLowerCase().includes(search.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(search.toLowerCase())
        )
      : [];

  return (
    <div className="coin-search-input-container">
      <div className="coin-search-input">
        <label htmlFor="coin-search-input-fill">
          <div className="search-icon-container">
            <img src={searchIcon} alt="Search icon" />
          </div>
        </label>

        <input
          id="coin-search-input-fill"
          type="text"
          placeholder="Search tokens"
          onChange={handleChange}
          value={search}
          onKeyDown={handleKeyDown}
        />

        {search !== "" && (
          <div className="coin-search-input-icon">
            <img
              className="coin-search-input-close"
              onClick={handleClose}
              src={CloseIcon}
              alt="Close Icon"
            />
          </div>
        )}
      </div>
      <div className="coin-search-input-result">
        {filteredCoins.map((coin, index) => (
          <Link 
            to={`/explore/${coin.id}`} 
            key={index} 
            {...(onEvent && { onClick: (e) => {
              e.stopPropagation();
              handleCoinClick()} })} 
          >
            <div
              className={
                selectedCoin === index
                  ? "search-result-line active"
                  : "search-result-line"
              }
            >
              <div className="search-result-line-logo">
                <img src={coin.image} alt={"logo of" + coin.name} />
                <h3 className="search-result-line-symbol">
                  {coin.symbol.toUpperCase()}
                </h3>
              </div>
              <h3 className="search-result-line-name">{coin.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CoinSearchInput;
