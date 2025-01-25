import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/index.css";

import App from "./App.jsx";
import CoinProvider from "./contexts/CoinContext";
import DashboardPage from "./pages/Dashboard.jsx";
import MarketPage from "./pages/Market/Market.jsx";
import TradePage from "./pages/Trade/Trade.jsx";
import RegisterPage from "./pages/Profile/Register.jsx";
import Swap from "./pages/Trade/Swap/Swap.jsx";
import ProfilePage from "./pages/Profile/Profile.jsx";
import LoginPage from "./pages/Profile/Login.jsx";
import ProfileDashboardPage from "./pages/Profile/ProfileDashboard.jsx";
import ProfileAssetsPage from "./pages/Profile/ProfileAsset.jsx";
import NotFoundPage from "./pages/NotFound.jsx";
import ProfileTransactionHistoryPage from "./pages/Profile/ProfileTransactions.jsx";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "explore",
        element: <MarketPage />,
      },
      {
        path: "trade",
        element: <TradePage />,
        children: [
          { path: "swap", element: <Swap /> },
          { path: "limit", element: <Swap /> },
          { path: "send", element: <Swap /> },
          { path: "buy", element: <Swap /> },
        ],
      },
      {
        path: "profile",
        element: <ProfilePage />,
        children: [
          {
            index: true,
            element: <ProfileDashboardPage />,
          },
          {
            path: "assets",
            element: <ProfileAssetsPage />,
          },
          {
            path: "transactions",
            element: <ProfileTransactionHistoryPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/profile/register",
    element: <RegisterPage />,
  },
  {
    path: "/profile/login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CoinProvider>
      <RouterProvider router={routers} />
    </CoinProvider>
  </StrictMode>
);
