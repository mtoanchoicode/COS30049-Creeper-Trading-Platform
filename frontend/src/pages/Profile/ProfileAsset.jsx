import { Button, Layout } from "antd";
import React, { useState } from "react";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import ProfileSearchDetail from "../../components/Profile/ProfileSearchDetail/ProfileSearchDetail";

const ProfileAssetsPage = () => {
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [walletData, setWalletData] = useState({
    walletAddress: "0x1234567890abcdef1234567890abcdef12345678",
    ethBalance: "2.3456", // In Ether
    tokenHoldings: [
      {
        tokenName: "USD Coin",
        symbol: "USDC",
        balance: "1500.25",
      },
      {
        tokenName: "Tether",
        symbol: "USDT",
        balance: "750.50",
      },
      {
        tokenName: "Wrapped Bitcoin",
        symbol: "WBTC",
        balance: "0.056",
      },
    ],
    transactionHistory: [
      {
        hash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
        method: "Transfer",
        block: 16789045,
        from: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef",
        to: "0x1234567890abcdef1234567890abcdef12345678",
        amount: "0.5",
        fee: "0.00021",
      },
      {
        hash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
        method: "Swap",
        block: 16789046,
        from: "0x1234567890abcdef1234567890abcdef12345678",
        to: "0xabcdabcdabcdabcdabcdabcdabcdabcdabcdabcd",
        amount: "1.25",
        fee: "0.00035",
      },
      {
        hash: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdef",
        method: "Deposit",
        block: 16789047,
        from: "0x1234567890abcdef1234567890abcdef12345678",
        to: "0xdefdefdefdefdefdefdefdefdefdefdefdefdef",
        amount: "0.75",
        fee: "0.00030",
      },
    ],
  });
  return (
    <Layout style={{ padding: "20px", backgroundColor: "var(--black-color)" }}>
      <h2 className="profileAssetPage-heading">My Wallet</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          flexWrap: "wrap",
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
