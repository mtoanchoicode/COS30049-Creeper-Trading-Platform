import { React, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import "./config/appKitConfig";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

function App() {
  const [theme, setTheme] = useState("dark");

  const location = useLocation();
  const locationCheck = () => {
    return !location.pathname.startsWith("/trade");
  };

  return (
    <div className={`app ${theme}`}>
      <NavBar theme={theme} setTheme={setTheme} />
      <Outlet />
      {locationCheck() && <Footer />}
    </div>
  );
}

export default App;
