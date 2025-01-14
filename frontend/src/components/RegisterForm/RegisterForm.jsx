import { Button, Checkbox, Form, Input } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import googleIcon from "../../assets/Google Icon.svg";
import "./RegisterForm.css";
import SubmitButton from "../SubmitButton/SubmitButton";

const RegisterForm = ({ onFinish, onFinishFailed }) => {
  return (
    <Form
      layout="vertical"
      name="register"
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
            What should we call you?
          </span>
        }
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your email!",
          },
        ]}
      >
        <Input
          className="profileForm-input"
          placeholder="Enter your profile name"
        />
      </Form.Item>
      <Form.Item
        label={
          <span
            style={{
              color: "#D9D9D9",
            }}
          >
            What's your email?
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
            Create a password
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
        <div>
          <Checkbox className="register-checkbox" style={{ color: "#D9D9D9" }}>
            By creating an account, you agree to the{" "}
            <a href="/">Terms of use</a> and
            <a href="/"> Privacy Policy</a>
          </Checkbox>
        </div>
      </Form.Item>

      <Form.Item>
        <SubmitButton content="Create an account" />
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
          Or continue with Google
        </Button>
      </Form.Item>

      <div className="loginform-don-have-account">
        Already have an account?{" "}
        <Link to={"/profile/login"} style={{ color: "#00C853" }}>
          Sign in now
        </Link>
      </div>
    </Form>
  );
};
export default RegisterForm;
