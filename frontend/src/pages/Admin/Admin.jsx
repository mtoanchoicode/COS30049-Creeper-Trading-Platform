import React, { useEffect, useState } from "react";
import "./Admin.css";
import logo from "../../assets/Logo.png";
import TransactionTable from "../../components/Admin/TransactionTable";
import FeeCard from "../../components/Admin/FeeCard/FeeCard";
import TotalTransactionCard from "../../components/Admin/TotalTransactionCard/TotalTransactionCard";
import { Navigate, useNavigate } from "react-router-dom";
import TransactionSuccessRateChart from "../../components/Admin/TransactionRateChart/TransactionRateChart";
import getAllTransactions from "../../utils/getAllTransaction";
import Loader from "../../components/Loader/Loader";

const AdminPage = () => {
  const navigate = useNavigate();
  const [toggled, setToggled] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true); // Set loading to true when fetching starts
      const data = await getAllTransactions();
      if (data) setTransactions(data.reverse());
      setLoading(false); // Set loading to false when fetching ends
    };

    fetchTransactions();
  }, []);

  const calculateFeeData = (transactions) => {
    const feeMap = transactions.reduce((acc, tx) => {
      const token = tx.TokenSymbol || "Unknown";
      const fee = parseFloat(tx.Fee) || 0;

      if (!acc[token]) {
        acc[token] = { symbol: token, balance: 0 };
      }
      acc[token].balance += fee;
      return acc;
    }, {});

    return Object.values(feeMap);
  };

  const feeData = calculateFeeData(transactions);

  const handleToggle = () => {
    setToggled(!toggled);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/admin/login");
  };

  useEffect(() => {
    const bootstrapCSS = document.createElement("link");
    bootstrapCSS.rel = "stylesheet";
    bootstrapCSS.href =
      "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css";
    document.head.appendChild(bootstrapCSS);

    const fontAwesomeCSS = document.createElement("link");
    fontAwesomeCSS.rel = "stylesheet";
    fontAwesomeCSS.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css";
    document.head.appendChild(fontAwesomeCSS);

    const bootstrapJS = document.createElement("script");
    bootstrapJS.src =
      "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js";
    document.body.appendChild(bootstrapJS);

    return () => {
      document.head.removeChild(bootstrapCSS);
      document.head.removeChild(fontAwesomeCSS);
      document.body.removeChild(bootstrapJS);
    };
  }, []);

  return (
    <div className={`d-flex ${toggled ? "toggled" : ""}`} id="wrapper">
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
          <a
            role="button"
            onClick={(e) => {
              e.preventDefault();
              handleLogout();
            }}
            className="list-group-item list-group-item-action bg-transparent text-danger fw-bold admin-logout"
          >
            <i className="fas fa-power-off me-2"></i>Logout
          </a>
        </div>
      </div>

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
          {loading ? ( // Show loader while loading
            <Loader />
          ) : (
            <>
              <div className="row g-3 my-2">
                <FeeCard feeData={feeData} />
                <TotalTransactionCard transactions={transactions} />
                <TransactionSuccessRateChart transactions={transactions} />
              </div>

              <div className="row my-5">
                <div className="col">
                  <TransactionTable transactions={transactions} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
