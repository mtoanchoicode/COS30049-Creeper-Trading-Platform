import React from "react";
import ProfileWalletBalance from "../ProfileWalletBalance/ProfileWalletBalance";
import TransactionsHistory from "../ProfileTransactionHistory/ProfileTransactionHistory";
import Loader from "../../Loader/Loader";

const ProfileSearchDetail = ({ walletData, isLoading, error }) => {
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>;
  }

  if (!walletData) {
    return;
  }

  const isAddress = /^0x[a-fA-F0-9]{40}$/.test(walletData.walletAddress);
  const isTxHash = /^0x[a-fA-F0-9]{64}$/.test(walletData.walletAddress);

  return (
    <div>
      {isAddress && <ProfileWalletBalance walletBalance={walletData} />}
      <TransactionsHistory walletDetail={walletData} />
    </div>
  );
};

export default ProfileSearchDetail;
