import React, { useState } from "react";
import "./ProfileTransactionHistory.css";
import { CopyOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import WalletGraph from "../ProfileTransactionGraph/ProfileTransactionGraph";
import shortenAddress from "../../../utils/utils";

const TransactionsHistory = ({ walletDetail }) => {
  const transactionHistory = walletDetail.transactionHistory;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  // Check if transactionHistory is an array (wallet address) or an object (single transaction)
  const isSingleTransaction = !Array.isArray(transactionHistory);

  if (isSingleTransaction) {
    // If it's a single transaction, render the simple table
    const transaction = transactionHistory; // Single object

    return (
      <div className="profileTH-card profileTH-cardTransaction">
        <div className="profileTH-header">
          <h2 className="profileTH-heading">Transaction Details</h2>
        </div>
        <table className="profileTH-table">
          <tbody>
            {Object.entries(transaction).map(([key, value], index) => (
              <tr key={index}>
                <td>{key.charAt(0).toUpperCase() + key.slice(1)}</td>
                <td>
                  {["hash", "from", "to"].includes(key) ? (
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
                  ) : key === "amount" ? (
                    `${value} ETH`
                  ) : (
                    value
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // If it's an array, render the paginated transactions table
  const [view, setView] = useState("transactions");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(transactionHistory.length / itemsPerPage);
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

  const renderCell = (transaction, column) => {
    const value = transaction[column.toLowerCase().replace(" ", "")];
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
    } else if (column === "Amount") {
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
