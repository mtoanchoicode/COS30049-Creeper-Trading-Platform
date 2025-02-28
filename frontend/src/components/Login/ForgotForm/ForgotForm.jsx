import { Button, Form, Input } from "antd";
import React from "react";
import SubmitButton from "../../SubmitButton/SubmitButton";
import "./ForgotForm.css";
import { Link } from "react-router-dom";

const ForgotForm = ({ onFinish, loading }) => {
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
        name="forgot"
        initialValues={{ remember: true }}
        onFinish={onFinish}
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
        <div className="forgotForm-BtnContainer">
          <Button className="forgotForm-backBtn" href="../login">
            Back
          </Button>
          <SubmitButton content={"Continue"} loading={loading} />
        </div>
      </Form>
    </div>
  );
};

export default ForgotForm;
