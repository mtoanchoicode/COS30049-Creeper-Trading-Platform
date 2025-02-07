import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/index.css";

import App from "./App.jsx";
import CoinProvider from "./contexts/CoinContext";
import DashboardPage from "./pages/Dashboard.jsx";
import MarketPage from "./pages/Market/Market.jsx";
import TradePage from "./pages/Trade/Trade.jsx";
import CoinDetails from "./pages/Market/CoinDetails.jsx";
import RegisterPage from "./pages/Profile/Register.jsx";
import Swap from "./pages/Trade/Swap.jsx";
import Limit from "./pages/Trade/Limit.jsx";
import Send from "./pages/Trade/Send.jsx";
import Buy from "./pages/Trade/Buy.jsx";
import ProfilePage from "./pages/Profile/Profile.jsx";
import LoginPage from "./pages/Profile/Login.jsx";
import ProfileDashboardPage from "./pages/Profile/ProfileDashboard.jsx";
import ProfileAssetsPage from "./pages/Profile/ProfileAsset.jsx";
import NotFoundPage from "./pages/NotFound.jsx";
import { UserProvider } from "./contexts/UserContext.jsx";
import ProfileSearchPage from "./pages/Profile/ProfileSearch.jsx";
import LoginMain from "./pages/Profile/LoginMain.jsx";
import ForgotPage from "./pages/Profile/Forgot.jsx";

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
        path: "explore/:coinId",
        element: <CoinDetails />,
      },
      {
        path: "trade",
        element: <TradePage />,
        children: [
          { path: "swap", element: <Swap /> },
          { path: "limit", element: <Limit /> },
          { path: "send", element: <Send /> },
          { path: "buy", element: <Buy /> },
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
            element: <ProfileSearchPage />,
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
    children: [
      {
        index: true,
        element: <LoginMain />,
      },
      {
        path: "forgot",
        element: <ForgotPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <CoinProvider>
        <RouterProvider router={routers} />
      </CoinProvider>
    </UserProvider>
  </StrictMode>
);
