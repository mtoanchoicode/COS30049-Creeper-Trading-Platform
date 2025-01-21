import { Layout } from "antd";
import React from "react";
import HeaderInfo from "../../components/ProfileHeaderInfo/ProfileHeaderInfo";
import TransactionsHistory from "../../components/ProfileTransactionHistory/ProfileTransactionHistory";

const ProfileTransactionHistoryPage = () => {
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
        <TransactionsHistory shortVersion={false} />
      </div>
    </Layout>
  );
};

export default ProfileTransactionHistoryPage;
