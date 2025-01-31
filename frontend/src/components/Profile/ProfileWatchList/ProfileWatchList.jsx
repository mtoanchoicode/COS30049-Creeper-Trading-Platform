import React, { useContext, useState } from "react";
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

const ProfileWatchList = () => {
  const { userData } = useUser();
  const { coins } = useContext(CoinContext);
  const watchCoin = coins.filter((coin) =>
    userData.watch_coin.includes(coin.symbol)
  );

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

  return (
    <div className="watchList-card">
      <div className="watchList-tableContainer">
        <h2>Watch List</h2>
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
                      to={`../${coin.symbol}`}
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
                  <a className="watchList-Delete">
                    <DeleteFilled></DeleteFilled>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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
      </div>
    </div>
  );
};

export default ProfileWatchList;
