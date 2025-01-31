import { Layout } from "antd";
import React from "react";
import HeaderInfo from "../../components/Profile/ProfileHeaderInfo/ProfileHeaderInfo";
import EstimatedBalance from "../../components/Profile/ProfileEstimatedBalance/ProfileEstimatedBalance";
import ProfileWatchList from "../../components/Profile/ProfileWatchList/ProfileWatchList";
import TransactionsHistory from "../../components/Profile/ProfileTransactionHistory/ProfileTransactionHistory";

const ProfileDashboardPage = () => {
  return (
    <Layout
      style={{
        padding: "1rem",
        backgroundColor: "var(--black-color)",
      }}
    >
      <HeaderInfo />
      {/* <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          flexWrap: "wrap",
          gap: "3rem",
          marginBottom: 20,
        }}
      ></div> */}
      <ProfileWatchList />
    </Layout>
  );
};

export default ProfileDashboardPage;
