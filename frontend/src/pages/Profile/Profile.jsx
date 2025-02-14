import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import React from "react";
import MenuBar from "../../components/Profile/ProfileMenuBar/ProfileMenuBar";
import { Outlet } from "react-router-dom";

const ProfilePage = () => {
  return (
    <Layout
      style={{
        marginTop: "4rem",
        height: "fit-content",
        backgroundColor: "var(--app-background)",
      }}
    >
      <Sider
        style={{ marginTop: "1rem", marginLeft: "1rem", height: "fit-content" }}
        width={300}
        breakpoint="md"
        collapsedWidth={50} // Width when collapsed
        onBreakpoint={(broken) => {
          console.log(broken ? "Collapsed" : "Expanded");
        }}
      >
        <MenuBar />
      </Sider>
      <Outlet />
    </Layout>
  );
};

export default ProfilePage;
