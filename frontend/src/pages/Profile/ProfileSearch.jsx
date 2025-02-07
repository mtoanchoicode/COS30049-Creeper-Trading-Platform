import { Layout } from "antd";
import React, { useEffect, useState, useCallback } from "react";
import ProfileSearchHeader from "../../components/Profile/ProfileSearchHeader/ProfileSearchHeader";
import ProfileSearchDetail from "../../components/Profile/ProfileSearchDetail/ProfileSearchDetail";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// Utility function to debounce API calls
const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

const ProfileSearchPage = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [walletData, setWalletData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Debounced function to update wallet address
  const debouncedSetWalletAddress = useCallback(
    debounce(setWalletAddress, 500),
    []
  );

  useEffect(() => {
    const fetchWalletData = async () => {
      if (!walletAddress) return; // Don't fetch if address is empty

      setIsLoading(true);
      setError("");
      try {
        const response = await fetch(
          `${API_BASE_URL}/v1/api/wallet/${walletAddress}`,
          { method: "GET" }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();

        if (!data || Object.keys(data).length === 0) {
          throw new Error("No wallet data found.");
        }

        setWalletData(data);
      } catch (err) {
        setError(err.message || "Something went wrong!");
        console.log(err);
        setWalletData(null); // Clear previous data on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchWalletData();
  }, [walletAddress]);

  return (
    <Layout style={{ padding: "20px", backgroundColor: "var(--black-color)" }}>
      <ProfileSearchHeader onSearch={debouncedSetWalletAddress} />
      <ProfileSearchDetail
        walletData={walletData}
        isLoading={isLoading}
        error={error}
      />
    </Layout>
  );
};

export default ProfileSearchPage;
