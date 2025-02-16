import { React, useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import "./config/appKitConfig";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import ChatbotWidget from "./components/ChatbotWidget/ChatbotWidget";

function App() {
  const [theme, setTheme] = useState("dark");
  const location = useLocation();

  useEffect(() => {
    // Set the background color based on the theme
    document.documentElement.style.backgroundColor =
      theme === "dark" ? "#131313" : "white";
    document.documentElement.style.color = theme === "dark" ? "white" : "black";
  }, [theme]);

  const locationCheck = () => {
    return !location.pathname.startsWith("/trade");
  };

  return (
    <div className={`app ${theme}`}>
      {" "}
      {/* Use template literal for className */}
      <NavBar theme={theme} setTheme={setTheme} />
      <Outlet />
      {locationCheck() && <Footer />}
      <ChatbotWidget />
    </div>
  );
}

export default App;
