import { Layout } from "antd";
import React, { useEffect, useState } from "react";
import ProfileSearchHeader from "../../components/Profile/ProfileSearchHeader/ProfileSearchHeader";
import ProfileSearchDetail from "../../components/Profile/ProfileSearchDetail/ProfileSearchDetail";

const ProfileSearchPage = () => {
  const [walletAddress, setWalletAddress] = useState("");
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // useEffect(() => {
  //   const fetchWalletData = async () => {
  //     if (!walletAddress) return;
  //     setIsLoading(true);
  //     setError('');
  //     try {
  //       const response = await fetch('', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ address: walletAddress }),
  //       });
  //       if (!response.ok) {
  //         throw new Error(`Error: ${response.statusText}`);
  //       }
  //       const data = await response.json();
  //       setWalletData(data); // Update wallet data
  //     } catch (err) {
  //       setError(err.message || 'Something went wrong!');
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchWalletData();
  // }, [walletAddress]);

  return (
    <Layout style={{ padding: "20px", backgroundColor: "var(--black-color)" }}>
      <ProfileSearchHeader onSearch={(address) => setWalletAddress(address)} />
      <ProfileSearchDetail
        walletData={walletData}
        isLoading={isLoading}
        error={error}
      />
    </Layout>
  );
};

export default ProfileSearchPage;
