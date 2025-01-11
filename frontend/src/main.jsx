import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/index.css";
import DashboardPage from "./pages/Dashboard.jsx";
import MarketPage from "./pages/Market.jsx";
import AboutUsPage from "./pages/Market.jsx";
import TradePage from "./pages/Trade.jsx";
import RegisterPage from "./pages/Register.jsx";

import App from "./App.jsx";

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
