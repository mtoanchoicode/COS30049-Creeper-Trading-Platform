import React from "react";
import { Form, Input, Button, Checkbox, Row, Col } from "antd";
import "./Profile.css";

import LoginLogo from "../../components/Login/LoginLogo/LoginLogo";
import LoginCover from "../../assets/login-cover.jpeg";
import { Outlet } from "react-router-dom";
const LoginPage = () => {
  return (
    <Row style={{ minHeight: "100vh" }}>
      {/* Left Column - Form */}
      <Col xs={24} sm={24} md={12} lg={12} xl={12} className="profilePage-col">
        <LoginLogo />
        <div style={{ margin: "0 auto", color: "#fff" }}>
          <Outlet />
        </div>
      </Col>

      {/* Right Column - Image */}
      <Col
        style={{ backgroundColor: "#05200f", borderRadius: "1rem" }}
        xs={0}
        sm={0}
        md={12}
        lg={12}
        xl={12}
      >
        <div className="loginPage-coverContainer">
          <img className="loginPage-cover" src={LoginCover}></img>
        </div>
      </Col>
    </Row>
  );
};

export default LoginPage;
