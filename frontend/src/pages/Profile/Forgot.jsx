import React, { useState } from "react";
import ForgotForm from "../../components/Login/ForgotForm/ForgotForm";
import { useNavigate } from "react-router-dom";
import { postGetOtp } from "../../utils/api";
import { notification } from "antd";

const ForgotPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    const { email } = values;

    try {
      const res = await postGetOtp(email.trim());
      console.log("Debuging", res);
      if (res.EC == 1) {
        notification.success({
          message: "SEND OTP SUCCESS",
          description: res.message,
        });
      } else {
        notification.error({
          message: "SEND OTP FAIL",
          description: res.message,
        });
      }
    } catch (error) {
      notification.error({
        message: "SEND OTP FAIL",
        description: "Something went wrong!",
      });
    }
    setLoading(false);
  };

  return <ForgotForm onFinish={onFinish} loading={loading} />;
};

export default ForgotPage;
