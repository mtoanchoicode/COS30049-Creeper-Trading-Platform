import React, { useContext, useEffect, useState } from "react";
import "./ProfileWatchList.css";
import { CoinContext } from "../../../contexts/CoinContext";
import { useUser } from "../../../contexts/UserContext";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  DeleteFilled,
  RightOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { getWatchList, postWatchList } from "../../../utils/api";

const ProfileWatchList = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const { userData } = useUser();
  const [watchList, setWatchList] = useState([]);
  const { coins } = useContext(CoinContext);

  const handleDelete = async (symbol) => {
    try {
      // Remove from localStorage
      const savedFavorites =
        JSON.parse(localStorage.getItem("favorites")) || {};
      delete savedFavorites[symbol]; // Remove the coin
      localStorage.setItem("favorites", JSON.stringify(savedFavorites));

      // Call API to delete from backend
      await postWatchList(symbol.toLowerCase());

      // Update state to reflect the deletion
      setWatchList((prevWatchList) =>
        prevWatchList.filter((item) => item !== symbol)
      );
    } catch (error) {
      console.error("Error deleting from watchlist:", error);
    }
  };

  useEffect(() => {
    async function fetchWatchList() {
      try {
        const data = await getWatchList();
        setWatchList(data.watchList || []);
      } catch (err) {
        console.error("Error fetching watch list:", err);
        setError(err);
      } finally {
      }
    }

    fetchWatchList();
  }, []);

  const watchCoin = coins.filter((coin) => watchList.includes(coin.symbol));

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Calculate total pages
  const totalPages = Math.ceil(watchCoin.length / itemsPerPage);

  // Get the coins for the current page
  const paginatedCoins = watchCoin.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Define the column names
  const columns = ["Name", "Current Price", "24H Change", ""];

  //
  return (
    <div className="watchList-card">
      <h2>Watch List</h2>
      {auth.isAuthenticated ? (
        <div className="watchList-tableContainer">
          <table className="watchList-table">
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th key={index}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedCoins.map((coin) => (
                <tr key={coin.id}>
                  <td>
                    <div className="watchList-CoinNameContainer">
                      <img src={coin.image} alt={coin.name} />

                      <Link
                        to={`../explore/${coin.name.toLowerCase()}`}
                        className="watchList-CoinName"
                      >
                        <b>{coin.name}</b>
                        <div>{coin.symbol.toUpperCase()}</div>
                      </Link>
                    </div>
                  </td>
                  <td>{coin.current_price.toLocaleString()}$</td>
                  <td className="watchList-Percent">
                    {coin.price_change_24h.toLocaleString()}$
                    <span
                      className={
                        coin.price_change_percentage_24h < 0
                          ? "watchList-PercentNegative"
                          : "watchList-PercentPositive"
                      }
                    >
                      {coin.price_change_percentage_24h < 0 ? (
                        <ArrowDownOutlined />
                      ) : (
                        <ArrowUpOutlined />
                      )}
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </span>
                  </td>
                  <td>
                    <a
                      className="watchList-Delete"
                      onClick={() => handleDelete(coin.symbol)}
                    >
                      <DeleteFilled></DeleteFilled>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {watchCoin.length > 0 && (
            <div className="watchList-pagination">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <LeftOutlined />
              </button>
              <span className="watchList-page">{currentPage}</span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                <RightOutlined />
              </button>
            </div>
          )}
        </div>
      ) : (
        <p> Nothing in Watch List</p>
      )}
    </div>
  );
};

export default ProfileWatchList;
