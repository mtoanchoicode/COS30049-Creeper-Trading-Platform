import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/Login/LoginForm/LoginForm";
import { useContext } from "react";
import { loginAPI } from "../../utils/api.js";
import { AuthContext } from "../../contexts/AuthContext";
import { notification } from "antd";

const LoginMain = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);
  const onFinish = async (values) => {
    const { email, password } = values;
    const res = await loginAPI(email, password);
    if (res && res.EC == 0) {
      localStorage.setItem("access_token", res.access_token);
      notification.success({
        message: "LOGIN USER",
        description: "Success",
      });
      setAuth({
        isAuthenticated: true,
        user: {
          uid: res?.user?.uid ?? "",
          email: res?.user?.email ?? "",
          name: res?.user?.name ?? "",
        },
      });
      navigate("/profile");
    } else {
      notification.error({
        message: "LOGIN USER",
        description: res?.EM ?? "Error",
      });
    }
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return <LoginForm onFinish={onFinish} onFinishFailed={onFinishFailed} />;
};

export default LoginMain;
