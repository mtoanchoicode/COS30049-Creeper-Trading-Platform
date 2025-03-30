import { Layout } from "antd";
import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProfileSearchHeader from "../../components/Profile/ProfileSearchHeader/ProfileSearchHeader";
import ProfileSearchDetail from "../../components/Profile/ProfileSearchDetail/ProfileSearchDetail";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

const ProfileSearchPage = () => {
  const { walletAddress: urlWalletAddress } = useParams();
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState(urlWalletAddress || "");
  const [walletData, setWalletData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (urlWalletAddress) {
      setWalletAddress(urlWalletAddress);
    }
  }, [urlWalletAddress]);

  const fetchWalletData = async (address) => {
    if (!address) return;
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_BASE_URL}/v1/api/wallet/${address}`);
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      const walletData = await response.json();

      if (!walletData || Object.keys(walletData).length === 0) {
        throw new Error("No wallet data found.");
      }

      // Fetch NFT data
      console.log(
        "Fetching NFT data from:",
        `${API_BASE_URL}/v1/api/nft-search/${address}`
      );
      const nftResponse = await fetch(
        `${API_BASE_URL}/v1/api/nft-search/${address}`,
        {
          method: "GET",
        }
      );

      if (!nftResponse.ok) {
        throw new Error(`Error fetching NFT data: ${nftResponse.statusText}`);
      }

      const nftData = await nftResponse.json();

      // Add NFT data to wallet data
      const updatedWalletData = { ...walletData, nfts: nftData.nfts || [] };

      setWalletData(updatedWalletData);
    } catch (err) {
      setError(err.message || "Something went wrong!");
      setWalletData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWalletData(walletAddress);
  }, [walletAddress]);

  return (
    <Layout
      style={{ padding: "20px", backgroundColor: "var(--app-background)" }}
    >
      <ProfileSearchHeader
        onSearch={(newAddress) => {
          setWalletAddress(newAddress);
          navigate(`/profile/transactions/${newAddress}`);
        }}
      />
      <ProfileSearchDetail
        walletData={walletData}
        isLoading={isLoading}
        error={error}
      />
    </Layout>
  );
};

export default ProfileSearchPage;
