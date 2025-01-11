import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/index.css";
import Dashboard from "./pages/Dashboard.jsx";
import Market from "./pages/Market.jsx";
import AboutUs from "./pages/Market.jsx";

import App from "./App.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "market",
        element: <Market />,
      },
      {
        path: "trading",
        element: <Trading />,
      },
      {
        path: "about",
        element: <AboutUs />,
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
