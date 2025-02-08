import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import "./config/appKitConfig";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

function App() {
  const location = useLocation();
  const locationCheck = () => {
    return !location.pathname.startsWith("/trade");
  };

  return (
    <>
      <NavBar />
      <Outlet />
      {locationCheck() && <Footer />}
    </>
  );
}

export default App;
