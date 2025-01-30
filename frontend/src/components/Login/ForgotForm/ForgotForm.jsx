import { Button, Form, Input } from "antd";
import React from "react";
import SubmitButton from "../../SubmitButton/SubmitButton";
import "./ForgotForm.css";
import { Link } from "react-router-dom";

const ForgotForm = ({ onFinish, onFinishFailed }) => {
  return (
    <div>
      <div className="forgotForm-header">
        <h1 className="forgotForm-heading">Forgot Password?</h1>
        <p className="forgotForm-subtext">
          No worries, we'll send you reset insturctions!
        </p>
      </div>

      <Form
        layout="vertical"
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="forgotForm-Form"
      >
        <Form.Item
          label={
            <span
              style={{
                color: "#D9D9D9",
              }}
            >
              Email
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
          <Input className="forgotForm-input" placeholder="Enter your email" />
        </Form.Item>
      </Form>
      <div className="forgotForm-BtnContainer">
        <Button className="forgotForm-backBtn" href="../login">
          Back
        </Button>
        <SubmitButton content={"Continue"} />
      </div>
    </div>
  );
};

export default ForgotForm;
