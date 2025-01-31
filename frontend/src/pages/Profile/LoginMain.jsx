import LoginForm from "../../components/Login/LoginForm/LoginForm";

const LoginMain = () => {
  const onFinish = async (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return <LoginForm onFinish={onFinish} onFinishFailed={onFinishFailed} />;
};

export default LoginMain;
