import React from "react";
import ProfileWalletBalance from "../ProfileWalletBalance/ProfileWalletBalance";
import TransactionsHistory from "../ProfileTransactionHistory/ProfileTransactionHistory";

const ProfileSearchDetail = ({ walletData, isLoading, error }) => {
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!walletData) {
    return <p>No wallet data available.</p>;
  }
  return (
    <div>
      <ProfileWalletBalance walletBalance={walletData} />
      <TransactionsHistory walletDetail={walletData} />
    </div>
  );
};

export default ProfileSearchDetail;
