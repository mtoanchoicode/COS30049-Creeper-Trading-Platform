import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, notification } from "antd";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import { postResetPassword } from "../../utils/api";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    const { password, confirmPassword } = values;

    if (password !== confirmPassword) {
      notification.error({
        message: "PASSWORD MISMATCH",
        description: "Passwords do not match!",
      });
      setLoading(false);
      return;
    }

    try {
      const res = await postResetPassword(password);
      console.log(res);
      if (res.EC === 1) {
        notification.success({
          message: "PASSWORD RESET SUCCESS",
          description: res.message,
        });
        localStorage.removeItem("access_token");
        navigate("/profile/login");
      } else {
        notification.error({
          message: "PASSWORD RESET FAILED",
          description: res.message,
        });
      }
    } catch (error) {
      console.log(error);
      notification.error({
        message: "PASSWORD RESET FAILED!",
        description: "Something went wrong!",
      });
    }
    setLoading(false);
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item
        label={<span style={{ color: "#D9D9D9" }}>New Password</span>}
        name="password"
        rules={[{ required: true, message: "Please enter your new password!" }]}
      >
        <Input.Password
          className="forgotForm-input"
          placeholder="Enter new password"
        />
      </Form.Item>

      <Form.Item
        label={<span style={{ color: "#D9D9D9" }}>Confirm Password</span>}
        name="confirmPassword"
        rules={[{ required: true, message: "Please confirm your password!" }]}
      >
        <Input.Password
          className="forgotForm-input"
          placeholder="Confirm new password"
        />
      </Form.Item>

      <SubmitButton content={"Confirm"} loading={loading} />
    </Form>
  );
};

export default ResetPasswordPage;
