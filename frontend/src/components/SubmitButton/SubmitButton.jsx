import { Button } from "antd";
import React from "react";
import "./SubmitButton.css";

const SubmitButton = ({ content }) => {
  return (
    <Button
      type="primary"
      htmlType="submit"
      block
      className="loginform-login-button"
    >
      {content}
    </Button>
  );
};

export default SubmitButton;
