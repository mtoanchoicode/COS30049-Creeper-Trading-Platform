import React, { useState } from "react";
import "./ProfileTransactionHistory.css";
import exportIcon from "../../../assets/Export Icon.svg";
import Icons from "../../Icons/Icons";
import shortenAddress from "../../../utils/utils";
import { CopyOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import WalletGraph from "../ProfileTransactionGraph/ProfileTransactionGraph";

const TransactionsHistory = ({ walletDetail }) => {
  const [view, setView] = useState("transactions");
  const transactionHistory = walletDetail.transactionHistory;

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  // Calculate total pages
  const totalPages = Math.ceil(transactionHistory.length / itemsPerPage);

  // Get the coins for the current page
  const paginatedTransactions = transactionHistory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns = [
    "Hash",
    "Timestamp",
    "Block",
    "From",
    "To",
    "Amount",
    "Fee",
    "Method",
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const renderCell = (transactionHistory, column) => {
    const value = transactionHistory[column.toLowerCase().replace(" ", "")];
    if (["Hash", "From", "To"].includes(column)) {
      return (
        <div className="profileTH-AddressContainer">
          <div className="profileTH-TooltipContainer">
            <span className="profileTH-AddressText">
              {shortenAddress(value)}
            </span>
            <div className="profileTH-Tooltip">{value}</div>
          </div>

          <button
            className="profileTH-CopyButton"
            onClick={() => copyToClipboard(value)}
          >
            <CopyOutlined />
          </button>
        </div>
      );
    } else if (["Amount"].includes(column)) {
      return `${value} ETH`;
    } else {
      return value;
    }
  };

  return (
    <>
      <div className="profileTH-switchView">
        <button
          onClick={() => setView("transactions")}
          className={`profileTH-button ${
            view === "transactions" ? "active" : ""
          }`}
        >
          Transactions
        </button>
        <button
          onClick={() => setView("visualize")}
          className={`profileTH-button ${view === "visualize" ? "active" : ""}`}
        >
          Visualize
        </button>
      </div>
      <div className="profileTH-card">
        <div className="profileTH-header">
          <h2 className="profileTH-heading">Transactions</h2>
        </div>

        {view === "transactions" ? (
          <div>
            <table className="profileTH-table table-wrapper">
              <thead>
                <tr>
                  {columns.map((column, index) => (
                    <th key={index}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedTransactions.map((transaction, index) => (
                  <tr key={index}>
                    {columns.map((column, colIndex) => (
                      <td key={colIndex}>{renderCell(transaction, column)}</td>
                    ))}
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
        ) : (
          <div className="profileTH-visualizeComingSoon">
            {walletDetail?.transactionHistory?.length > 0 ? (
              <WalletGraph initialWallet={walletDetail.walletAddress} />
            ) : (
              <p>Don't have any transactions to show!</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default TransactionsHistory;
