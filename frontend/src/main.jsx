import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/index.css";
import App from "./App.jsx";
import DashboardPage from "./pages/Dashboard.jsx";
import MarketPage from "./pages/Market.jsx";
import AboutUsPage from "./pages/AboutUs.jsx";
import TradePage from "./pages/Trade.jsx";
import RegisterPage from "./pages/Register.jsx";
import BuySellPage from "./pages/BuySell.jsx";
import ExplorePage from "./pages/Explore.jsx";

const router = createBrowserRouter([
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
      },
      {
        path: "buysell",
        element: <BuySellPage />,
      },
      {
        path: "explore",
        elememt: <ExplorePage />,
      },
    ],
  },
  {
    path: "register",
    element: <RegisterPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
