import { Button, Layout } from "antd";
import React, { useEffect, useState, useRef } from "react";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import ProfileSearchDetail from "../../components/Profile/ProfileSearchDetail/ProfileSearchDetail";

const ProfileAssetsPage = () => {
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [walletData, setWalletData] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  // Track previous connection state
  const wasConnected = useRef(false);

  useEffect(() => {
    const fetchWalletData = async () => {
      if (!address || !isConnected) return; // Don't fetch if no address or not connected

      setIsLoading(true);
      setError("");

      try {
        const response = await fetch(
          `${API_BASE_URL}/v1/api/wallet/${address}`,
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
        setWalletData(null); // Clear previous data on error
      } finally {
        setIsLoading(false);
      }
    };

    // Only fetch data when connecting for the first time
    if (isConnected && !wasConnected.current) {
      fetchWalletData();
    }

    // Handle logout: Clear data when disconnecting
    if (!isConnected && wasConnected.current) {
      setWalletData(null);
    }

    // Update previous connection state
    wasConnected.current = isConnected;
  }, [isConnected, address]);

  return (
    <Layout
      style={{
        padding: "20px",
        backgroundColor: "var(--app-background)",
        width: "100%",
      }}
    >
      <h2 className="profileAssetPage-heading">My Wallet</h2>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",

          gap: "3rem",
          marginBottom: 20,
        }}
      >
        {isConnected ? (
          <ProfileSearchDetail
            walletData={walletData}
            isLoading={isLoading}
            error={error}
          />
        ) : (
          <div className="profileAsset-warning">
            <button onClick={() => open()}>Connect to access Wallet</button>
          </div>
        )}
      </div>
      {/* <Market /> */}
    </Layout>
  );
};

export default ProfileAssetsPage;
