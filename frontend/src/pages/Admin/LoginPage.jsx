import { Checkbox, Form, Input } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import "./Admin.css";

const LoginAdminPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    if (username === "admin" && password === "123") {
      localStorage.setItem("isAuthenticated", "true"); // Save login state
      navigate("/admin"); // Redirect to Admin Page
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="login-container">
      <h1 className="profilePage-h1">Admin Dashboard</h1>

      <Form
        layout="vertical"
        name="login"
        onFinish={handleLogin}
        initialValues={{ remember: true }}
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item>
          <SubmitButton content="Sign In" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginAdminPage;
