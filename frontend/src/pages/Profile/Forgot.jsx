import React, { useState } from "react";
import ForgotForm from "../../components/Login/ForgotForm/ForgotForm";
import { useNavigate } from "react-router-dom";
import { postGetOtp, postOTP } from "../../utils/api";
import { Form, Input, notification } from "antd";
import SubmitButton from "../../components/SubmitButton/SubmitButton";

const ForgotPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [email, setEmail] = useState("");

  const onFinish = async (values) => {
    setLoading(true);
    const { email } = values;
    setEmail(email.trim());

    try {
      const res = await postGetOtp(email.trim());
      console.log("Debuging", res);
      if (res.EC == 1) {
        notification.success({
          message: "SEND OTP SUCCESS",
          description: res.message,
        });
        setShowOtpInput(true);
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

  const onVerifyOtp = async (values) => {
    setLoading(true);
    try {
      const res = await postOTP(email, values.otp);
      if (res.EC == 1) {
        notification.success({
          message: "OTP VERIFIED",
          // description: res.message,
        });
        localStorage.setItem("access_token", res.access_token);
        navigate("/profile/login/reset");
      } else {
        notification.error({
          message: "OTP VERIFICATION FAILED",
          description: res.message,
        });
      }
    } catch (error) {
      console.log(error);
      notification.error({
        message: "OTP VERIFICATION FAILED",
        description: "Something went wrong!",
      });
    }
    setLoading(false);
  };

  return (
    <div>
      {!showOtpInput ? (
        <ForgotForm onFinish={onFinish} loading={loading} />
      ) : (
        <Form layout="vertical" onFinish={onVerifyOtp}>
          <Form.Item
            className="forgotForm-Form"
            label={
              <span
                style={{
                  color: "#D9D9D9",
                }}
              >
                Enter OTP
              </span>
            }
            name="otp"
            rules={[{ required: true, message: "Please enter the OTP!" }]}
          >
            <Input className="forgotForm-input" placeholder="Enter OTP" />
          </Form.Item>
          <SubmitButton content={"Continue"} loading={loading} />
        </Form>
      )}
    </div>
  );
};

export default ForgotPage;
