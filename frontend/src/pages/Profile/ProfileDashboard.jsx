import { Layout } from "antd";
import React from "react";
import HeaderInfo from "../../components/Profile/ProfileHeaderInfo/ProfileHeaderInfo";
import ProfileWatchList from "../../components/Profile/ProfileWatchList/ProfileWatchList";

const ProfileDashboardPage = () => {
  return (
    <Layout
      style={{
        padding: "1rem",
        backgroundColor: "var(--app-background)",
      }}
    >
      <HeaderInfo />
      <ProfileWatchList />
    </Layout>
  );
};

export default ProfileDashboardPage;
