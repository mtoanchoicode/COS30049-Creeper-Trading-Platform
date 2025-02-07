import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "./Loader.css"; // Import the external CSS file

const antIcon = <LoadingOutlined className="loader-spinner" spin />;

const Loader = () => {
  return (
    <div className="loader-container">
      <Spin indicator={antIcon} />
    </div>
  );
};

export default Loader;
