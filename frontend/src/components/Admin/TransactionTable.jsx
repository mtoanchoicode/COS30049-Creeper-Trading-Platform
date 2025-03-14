import React, { useState } from "react";
import { CopyOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import shortenAddress from "../../utils/utils"; // Assuming you have a utility function to shorten addresses

const TransactionTable = ({ transactions }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const paginatedTransactions = transactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const columns = [
    "ID",
    "User ID",
    "Hash",
    "From",
    "To",
    "Token ID",
    "Amount",
    "Fee",
    "Gas",
    "Method",
    "Created At",
  ];

  const renderCell = (transaction, column) => {
    const value = transaction[column.toLowerCase().replace(" ", "_")];
    if (["hash", "from", "to"].includes(column.toLowerCase())) {
      return (
        <div className="d-flex align-items-center">
          <span className="me-2">{shortenAddress(value)}</span>
          <button
            className="btn btn-link p-0"
            onClick={() => copyToClipboard(value)}
          >
            <CopyOutlined />
          </button>
        </div>
      );
    } else if (column === "amount") {
      return `${value} ETH`; // Adjust the token symbol as needed
    } else {
      return value;
    }
  };

  return (
    <div className="my-5">
      <h3 className="fs-3 mb-3">Transaction History</h3>
      <table className="table bg-white rounded shadow-sm table-hover">
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

      <div className="d-flex justify-content-between">
        <button
          className="btn btn-secondary"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <LeftOutlined />
        </button>
        <span className="align-self-center">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          className="btn btn-secondary"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          <RightOutlined />
        </button>
      </div>
    </div>
  );
};

export default TransactionTable;
