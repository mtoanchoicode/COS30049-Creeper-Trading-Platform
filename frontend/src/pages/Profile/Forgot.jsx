import React from "react";
import ForgotForm from "../../components/Login/ForgotForm/ForgotForm";

const ForgotPage = () => {
  const onFinish = async (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return <ForgotForm onFinish={onFinish} onFinishFailed={onFinishFailed} />;
};

export default ForgotPage;
