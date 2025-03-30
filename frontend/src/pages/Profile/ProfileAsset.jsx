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
  const wasConnected = useRef(false); // Track previous connection state

  useEffect(() => {
    const fetchWalletData = async () => {
      if (!address || !isConnected) return; // Don't fetch if no address or not connected

      setIsLoading(true);
      setError("");

      try {
        console.log(
          "Fetching wallet data from:",
          `${API_BASE_URL}/v1/api/wallet/${address}`
        );
        const walletResponse = await fetch(
          `${API_BASE_URL}/v1/api/wallet/${address}`,
          {
            method: "GET",
          }
        );

        if (!walletResponse.ok) {
          throw new Error(
            `Error fetching wallet data: ${walletResponse.statusText}`
          );
        }

        const walletData = await walletResponse.json();

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
  }, [isConnected, address, API_BASE_URL]);

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
