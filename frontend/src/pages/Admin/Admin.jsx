import React, { useEffect, useState } from "react";
import "./Admin.css";
import logo from "../../assets/Logo.png";
import TransactionTable from "../../components/Admin/TransactionTable";
import FeeCard from "../../components/Admin/FeeCard/FeeCard";
import TotalTransactionCard from "../../components/Admin/TotalTransactionCard/TotalTransactionCard";
import { Navigate, useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();
  const [toggled, setToggled] = useState(false);

  const mockTransactions = [
    {
      id: 1,
      user_id: 1,
      hash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
      from: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
      to: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
      token_id: 1,
      amount: 0.5,
      fee: 0.01,
      gas: 21000,
      method: "Send",
      created_at: "2023-10-01",
    },
    {
      id: 2,
      user_id: 1,
      hash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
      from: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
      to: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
      token_id: 1,
      amount: 0.5,
      fee: 0.01,
      gas: 21000,
      method: "Send",
      created_at: "2023-10-01",
    },
    {
      id: 3,
      user_id: 1,
      hash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
      from: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
      to: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
      token_id: 1,
      amount: 0.5,
      fee: 0.01,
      gas: 21000,
      method: "Buy",
      created_at: "2023-10-01",
    },
    {
      id: 4,
      user_id: 1,
      hash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
      from: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
      to: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
      token_id: 1,
      amount: 0.5,
      fee: 0.01,
      gas: 21000,
      method: "Swap",
      created_at: "2023-10-01",
    },
  ];

  const mockFeeData = [
    { tokenName: "Sepolia", symbol: "ETH", balance: 190000 },
    { tokenName: "ChainLink Token", symbol: "LINK", balance: 250 },
    { tokenName: "Creeper Trading Token", symbol: "CEP", balance: 1000000 },
    { tokenName: "Ancient Forest", symbol: "LNX", balance: 390501.197 },
  ];

  const handleToggle = () => {
    setToggled(!toggled);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/admin/login"); // Redirect to login page
  };

  // Add CDN links to the document head
  useEffect(() => {
    // Add Bootstrap CSS
    const bootstrapCSS = document.createElement("link");
    bootstrapCSS.rel = "stylesheet";
    bootstrapCSS.href =
      "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css";
    document.head.appendChild(bootstrapCSS);

    // Add Font Awesome CSS
    const fontAwesomeCSS = document.createElement("link");
    fontAwesomeCSS.rel = "stylesheet";
    fontAwesomeCSS.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css";
    document.head.appendChild(fontAwesomeCSS);

    // Add Bootstrap JS
    const bootstrapJS = document.createElement("script");
    bootstrapJS.src =
      "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js";
    document.body.appendChild(bootstrapJS);

    // Cleanup function to remove added elements when component unmounts
    return () => {
      document.head.removeChild(bootstrapCSS);
      document.head.removeChild(fontAwesomeCSS);
      document.body.removeChild(bootstrapJS);
    };
  }, []);

  return (
    <div className={`d-flex ${toggled ? "toggled" : ""}`} id="wrapper">
      {/* Sidebar */}
      <div className="bg-white" id="sidebar-wrapper">
        <div className="sidebar-heading text-center py-4 primary-text fs-4 fw-bold text-uppercase border-bottom">
          <img src={logo} alt="Logo" />
          <span>CREEPER</span>
        </div>
        <div className="list-group list-group-flush my-3">
          <a
            href="#"
            className="list-group-item list-group-item-action bg-transparent second-text active"
          >
            <i className="fas fa-tachometer-alt me-2"></i>Dashboard
          </a>
          {/* <a
            href="#"
            className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
          >
            <i className="fas fa-project-diagram me-2"></i>Projects
          </a> */}
          <a
            onClick={(e) => {
              e.preventDefault(); // Prevents default anchor behavior
              handleLogout();
            }}
            className="list-group-item list-group-item-action bg-transparent text-danger fw-bold"
          >
            <i className="fas fa-power-off me-2"></i>Logout
          </a>
        </div>
      </div>
      {/* /#sidebar-wrapper */}

      {/* Page Content */}
      <div id="page-content-wrapper">
        <nav className="navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4">
          <div className="d-flex align-items-center">
            <i
              className="fas fa-align-left primary-text fs-4 me-3"
              id="menu-toggle"
              onClick={handleToggle}
            ></i>
            <h2 className="fs-2 m-0">Dashboard</h2>
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </nav>

        <div className="container-fluid px-4">
          <div className="row g-3 my-2">
            <FeeCard feeData={mockFeeData} />

            <TotalTransactionCard transactions={mockTransactions} />
          </div>

          <div className="row my-5">
            <div className="col">
              <TransactionTable transactions={mockTransactions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
