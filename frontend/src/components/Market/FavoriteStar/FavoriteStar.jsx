import React, { useEffect, useState } from "react";
import "./FavoriteStar.css";
import { postWatchList } from "../../../utils/api";

function FavoriteStar(props) {
  const [favorite, setFavorite] = useState(false);
  const coinSymbol = props.coinSymbol;

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || {};
    setFavorite(savedFavorites[coinSymbol] || false);
  }, [coinSymbol]);

  // Toggle favorite state
  async function toggleFavorite(event) {
    console.log("Add to favorite: ", coinSymbol);
    event.preventDefault(); //Prevent routing from Link parent
    const newFavoriteState = !favorite;
    setFavorite((prev) => !prev);
    try {
      await postWatchList(coinSymbol.toLowerCase());
      console.log("Complete");

      // Update localStorage with the new state
      const savedFavorites =
        JSON.parse(localStorage.getItem("favorites")) || {};
      savedFavorites[coinSymbol] = newFavoriteState;
      localStorage.setItem("favorites", JSON.stringify(savedFavorites));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <span
      className={`market-favorite-star ${
        favorite ? "isFavorite" : "notFavorite"
      }`}
      alt="Star Icon"
      onClick={toggleFavorite}
    ></span>
  );
}

export default FavoriteStar;
