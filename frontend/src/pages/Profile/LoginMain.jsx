import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/Login/LoginForm/LoginForm";
import { useContext, useState } from "react";
import { loginAPI } from "../../utils/api.js";
import { AuthContext } from "../../contexts/AuthContext";
import { notification } from "antd";

const LoginMain = () => {
  const navigate = useNavigate();
  const { auth, setAuth, fetchWatchList } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    const { email, password, expireCon } = values;

    try {
      const res = await loginAPI(email, password);

      if (res && res.EC === 0) {
        if (expireCon) {
          localStorage.setItem("access_token", res.access_token); // Persistent storage
        } else {
          localStorage.setItem("access_token", res.access_token); // Temporary storage
        }
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

        await fetchWatchList();

        navigate("/profile");
      } else {
        notification.error({
          message: "LOGIN USER",
          description: res?.EM ?? "Error",
        });
      }
    } catch (error) {
      notification.error({
        message: "LOGIN ERROR",
        description: "Something went wrong!",
      });
    }
    setLoading(false);
  };

  return <LoginForm onFinish={onFinish} loading={loading} />;
};

export default LoginMain;
