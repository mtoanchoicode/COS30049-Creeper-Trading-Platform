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
  return (
    <div>
      <ProfileWalletBalance walletBalance={walletData} />
      <TransactionsHistory walletDetail={walletData} />
    </div>
  );
};

export default ProfileSearchDetail;
