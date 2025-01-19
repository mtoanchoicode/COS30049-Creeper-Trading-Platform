import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import React from "react";
import MenuBar from "../../components/ProfileMenuBar/ProfileMenuBar";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

const ProfilePage = () => {
  return (
    <Layout
      style={{
        minHeight: "calc(100vh - 5rem)",
        marginTop: "5rem",
        backgroundColor: "var(--black-color)",
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
