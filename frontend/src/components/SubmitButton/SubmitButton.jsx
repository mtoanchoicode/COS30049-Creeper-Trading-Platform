import { Button } from "antd";
import React from "react";
import "./SubmitButton.css";

const SubmitButton = ({ content, loading = false }) => {
  return (
    <Button
      type="primary"
      htmlType="submit"
      block
      className="loginform-login-button"
      loading={loading}
    >
      {loading ? "Loading..." : content}
    </Button>
  );
};

export default SubmitButton;
