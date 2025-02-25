import { Button, Checkbox, Form, Input } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import "./LoginForm.css";
import SubmitButton from "../../SubmitButton/SubmitButton";

const LoginForm = ({ onFinish, loading }) => {
  return (
    <>
      <h1 className="profilePage-h1">Sign in to Creeper</h1>

      <Form
        layout="vertical"
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        className="loginform-main-form"
      >
        <Form.Item
          label={
            <span
              style={{
                color: "#D9D9D9",
              }}
            >
              Login
            </span>
          }
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input
            className="profileForm-input"
            placeholder="Email or phone number"
          />
        </Form.Item>

        <Form.Item
          label={
            <span
              style={{
                color: "#D9D9D9",
              }}
            >
              Password
            </span>
          }
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            className="profileForm-input"
            placeholder="Enter password"
          />
        </Form.Item>

        <Form.Item>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Form.Item name="expireCon" valuePropName="checked" noStyle>
              <Checkbox style={{ color: "#D9D9D9" }}>Remember me</Checkbox>
            </Form.Item>
            <Link
              to={"/profile/login/forgot"}
              style={{ color: "#D9D9D9", textDecoration: "underline" }}
            >
              Forgot password?
            </Link>
          </div>
        </Form.Item>

        <Form.Item>
          <SubmitButton content="Sign In" loading={loading} />
        </Form.Item>

        <div className="loginform-don-have-account">
          Don't have an account?{" "}
          <Link to={"/profile/register"} style={{ color: "#00C853" }}>
            Sign up now
          </Link>
        </div>
      </Form>
    </>
  );
};
export default LoginForm;
