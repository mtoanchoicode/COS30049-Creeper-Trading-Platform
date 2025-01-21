import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/index.css";

import App from "./App.jsx";
import CoinProvider from "./contexts/CoinContext";
import DashboardPage from "./pages/Dashboard.jsx";
import MarketPage from "./pages/Market/Market.jsx";
import AboutUsPage from "./pages/AboutUs.jsx";
import TradePage from "./pages/Trade.jsx";
import RegisterPage from "./pages/Profile/Register.jsx";
import SellPage from "./pages/SellPage.jsx";
import BuyPage from "./pages/BuyPage.jsx";
import ExplorePage from "./pages/Explore.jsx";
import SpotTrade from "./pages/Trade/SpotTrade/SpotTrade.jsx";
import MarginTrade from "./pages/Trade/MarginTrade/MarginTrade.jsx";
import ConvertTrade from "./pages/Trade/ConvertTrade/ConvertTrade.jsx";
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
        path: "market",
        element: <MarketPage />,
      },
      {
        path: "about",
        element: <AboutUsPage />,
      },
      {
        path: "trade",
        element: <TradePage />,
        children: [
          { path: "spot", element: <SpotTrade /> },
          { path: "margin", element: <MarginTrade /> },
          { path: "convert", element: <ConvertTrade /> },
        ],
      },
      {
        path: "buy",
        element: <BuyPage />,
      },
      {
        path: "sell",
        element: <SellPage />,
      },
      {
        path: "explore",
        element: <ExplorePage />,
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
