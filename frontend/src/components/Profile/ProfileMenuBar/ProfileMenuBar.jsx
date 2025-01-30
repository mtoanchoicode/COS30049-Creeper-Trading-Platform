import React from "react";
import { Menu } from "antd";
import {
  HomeOutlined,
  SearchOutlined,
  SettingOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import "./ProfileMenuBar.css";
import { Link, useLocation } from "react-router-dom";

const MenuBar = () => {
  const location = useLocation();
  const { pathname } = location;
  return (
    <Menu mode="inline" theme="dark" selectedKeys={[pathname]}>
      <Menu.Item key="/profile" icon={<HomeOutlined />}>
        <Link to={"/profile"}>Dashboard</Link>
      </Menu.Item>

      <Menu.Item key="/profile/assets" icon={<WalletOutlined />}>
        <Link to={"/profile/assets"}>Wallet</Link>
      </Menu.Item>
      <Menu.Item key="/profile/transactions" icon={<SearchOutlined />}>
        <Link to={"/profile/transactions"}>Search</Link>
      </Menu.Item>
      {/* <Menu.Item key="/profile/settings" icon={<SettingOutlined />}>
        <Link to={"/profile/settings"}>Settings</Link>
      </Menu.Item> */}
    </Menu>
  );
};

export default MenuBar;
