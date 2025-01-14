import React from "react";
import { Form, Input, Button, Checkbox, Row, Col } from "antd";
import "./Profile.css";
import LoginForm from "../../components/LoginForm/LoginForm";
import LoginLogo from "../../components/LoginLogo/LoginLogo";

const LoginPage = () => {
  const onFinish = async (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Row style={{ minHeight: "100vh" }}>
      {/* Left Column - Form */}
      <Col xs={24} sm={24} md={12} lg={12} xl={12} className="profilePage-col">
        <LoginLogo />
        <div style={{ margin: "0 auto", color: "#fff" }}>
          <h1 className="profilePage-h1">Sign in to Creeper</h1>
          <LoginForm onFinish={onFinish} onFinishFailed={onFinishFailed} />
        </div>
      </Col>

      {/* Right Column - Image */}
      <Col xs={0} sm={0} md={12} lg={12} xl={12}></Col>
    </Row>
  );
};

export default LoginPage;
