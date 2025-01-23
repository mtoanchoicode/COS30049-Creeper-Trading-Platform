import { Layout } from "antd";
import React from "react";
import HeaderInfo from "../../components/ProfileHeaderInfo/ProfileHeaderInfo";
import TransactionHistory from "../../components/ProfileTransactionHistory/ProfileTransactionHistory";
import EstimatedBalance from "../../components/ProfileEstimatedBalance/ProfileEstimatedBalance";
import ProfileBalanceChart from "../../components/ProfileBalanceChart/ProfileBalanceChart";

const ProfileAssetsPage = () => {
  return (
    <Layout style={{ padding: "20px", backgroundColor: "var(--black-color)" }}>
      <HeaderInfo />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          flexWrap: "wrap",
          gap: "3rem",
          marginBottom: 20,
        }}
      >
        <EstimatedBalance shortVersion={false} />
        <ProfileBalanceChart />
      </div>
      {/* <Market /> */}
    </Layout>
  );
};

export default ProfileAssetsPage;
