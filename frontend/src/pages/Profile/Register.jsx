import React from "react";
import { Form, Input, Button, Checkbox, Row, Col, notification } from "antd";
import "./Profile.css";
import LoginLogo from "../../components/Login/LoginLogo/LoginLogo";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import { useNavigate } from "react-router-dom";
import { createUserAPI } from "../../utils/api";

const RegisterPage = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const { name, email, password } = values;
    const res = await createUserAPI(name, email, password);
    if (res) {
      notification.success({
        message: "CREATE USER",
        description: "Success",
      });
      navigate("/profile/login");
    } else {
      notification.error({
        message: "CREATE USER",
        description: "Error",
      });
    }
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
