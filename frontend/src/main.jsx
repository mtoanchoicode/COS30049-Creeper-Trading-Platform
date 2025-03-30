import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/index.css";

import App from "./App.jsx";
import CoinProvider from "./contexts/CoinContext";
import NewsProvider from "./contexts/NewsContext.jsx";
import DashboardPage from "./pages/Dashboard.jsx";
import MarketPage from "./pages/Market/Market.jsx";
import TradePage from "./pages/Trade/Trade.jsx";
import CoinDetails from "./pages/Market/CoinDetails.jsx";
import About from "./pages/AboutUs/AboutUs.jsx";
import RegisterPage from "./pages/Profile/Register.jsx";
import Swap from "./pages/Trade/Swap.jsx";
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
import NewsPage from "./pages/News-Page/NewsPage.jsx";
import NewsDetailsPage from "./pages/News-Page/NewsDetailsPage.jsx";
import { AuthWrapper } from "./contexts/AuthContext.jsx";
import ResetPasswordPage from "./pages/Profile/ResetPassword.jsx";
import Faucet from "./pages/Trade/Faucet.jsx";
import Add from "./pages/Trade/AddPool.jsx";
import AdminPage from "./pages/Admin/Admin.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import LoginAdminPage from "./pages/Admin/LoginPage.jsx";
import CreateToken from "./pages/Trade/CreateToken.jsx";
import CreateCollection from "./pages/CreateNFT/CreateCollection.jsx";
import CreateCollectionDashBoard from "./pages/CreateNFT/CreateCollectionDashboard.jsx";
import NFT from "./pages/NFT/NFT.jsx";
import NFTCollection from "./pages/NFT/NFTCollection/NFTCollection.jsx";
import NFTDetails from "./pages/NFT/NFTDetails/NFTDetails.jsx";
import NFTTransfer from "./pages/NFT/NFTTransfer/NFTTransfer.jsx";

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
        path: "/about",
        element: <About />,
      },
      {
        path: "trade",
        element: <TradePage />,
        children: [
          { path: "send", element: <Send /> },
          { path: "swap", element: <Swap /> },
          { path: "buy", element: <Buy /> },
          { path: "faucet", element: <Faucet /> },
          { path: "add", element: <Add /> },
          { path: "create", element: <CreateToken /> },
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
            path: "transactions/:walletAddress?",
            element: <ProfileSearchPage />,
          },
        ],
      },
      {
        path: "create/collection",
        element: <CreateCollectionDashBoard/>,
        children: [
          {
            index: true,
            element: <CreateCollection />,
          },
        ],
      },
      {
        path: "news",
        element: <NewsPage />,
      },
      {
        path: "news/:id",
        element: <NewsDetailsPage />,
      },
      {
        path: "nft",
        element: <NFT />,
      },
      {
        path: "nft/:collectionId",
        element: <NFTCollection />,
      },
      {
        path: "nft/:collectionId/:nftId",
        element: <NFTDetails />,
      },
      {
        path: "nft/:collectionId/:nftId/transfer",
        element: <NFTTransfer />,
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
      {
        path: "reset",
        element: <ResetPasswordPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <ProtectedRoute element={<AdminPage />} />,
  },
  {
    path: "/admin/login",
    element: <LoginAdminPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NewsProvider>
      <UserProvider>
        <CoinProvider>
          <AuthWrapper>
            <RouterProvider router={routers} />
          </AuthWrapper>
        </CoinProvider>
      </UserProvider>
    </NewsProvider>
  </StrictMode>
);
