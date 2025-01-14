import { Button, Checkbox, Form, Input } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import googleIcon from "../../assets/Google Icon.svg";
import "./LoginForm.css";
import SubmitButton from "../SubmitButton/SubmitButton";

const LoginForm = ({ onFinish, onFinishFailed }) => {
  return (
    <Form
      layout="vertical"
      name="login"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
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
          <Checkbox style={{ color: "#D9D9D9" }}>Remember me</Checkbox>
          <Link
            to={"/profile/forgot"}
            style={{ color: "#D9D9D9", textDecoration: "underline" }}
          >
            Forgot password?
          </Link>
        </div>
      </Form.Item>

      <Form.Item>
        <SubmitButton content="Sign In" />
      </Form.Item>
      <hr style={{ height: "1px" }} />
      <Form.Item>
        <Button
          type="default"
          htmlType="button"
          block
          className="loginform-google-button"
        >
          <img
            src={googleIcon}
            alt="Google"
            className="loginform-google-icon"
          />
          Or sign in with Google
        </Button>
      </Form.Item>

      <div className="loginform-don-have-account">
        Don't have an account?{" "}
        <Link to={"/profile/register"} style={{ color: "#00C853" }}>
          Sign up now
        </Link>
      </div>
    </Form>
  );
};
export default LoginForm;
