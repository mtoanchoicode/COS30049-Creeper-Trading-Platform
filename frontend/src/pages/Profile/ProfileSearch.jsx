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
      const data = await response.json();
      setWalletData(data);
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
    <Layout style={{ padding: "20px", backgroundColor: "var(--black-color)" }}>
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
