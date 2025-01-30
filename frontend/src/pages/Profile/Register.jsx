import React from "react";
import { Form, Input, Button, Checkbox, Row, Col } from "antd";
import "./Profile.css";
import LoginLogo from "../../components/Login/LoginLogo/LoginLogo";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

const RegisterPage = () => {
  const onFinish = async (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Row style={{ minHeight: "100vh" }}>
      {/* Left Column - Form */}
      <Col span={24} className="profilePage-col">
        <LoginLogo />
        <div style={{ margin: "0 auto", color: "#fff" }}>
          <h1 className="profilePage-h1">Create an account</h1>
          <RegisterForm onFinish={onFinish} onFinishFailed={onFinishFailed} />
        </div>
      </Col>
    </Row>
  );
};

export default RegisterPage;
