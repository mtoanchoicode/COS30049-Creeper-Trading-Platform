import { React, useState, useEffect, useContext } from "react";
import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import "./config/appKitConfig";
import NavBar from "./components/NavBar/NavBar";
import MobileNavBar from "./components/NavBar/MobileNavBar";
import Footer from "./components/Footer/Footer";
import ChatbotWidget from "./components/ChatbotWidget/ChatbotWidget";
import { AuthContext } from "./contexts/AuthContext";

function App() {
  // Authentication
  const { setAuth, appLoading, setAppLoading } = useContext(AuthContext);

  useEffect(() => {
    const fetchAccount = async () => {
      setAppLoading(true);
      const res = await axios.get(`/v1/api/account`);
      if (res && !res.message) {
        setAuth({
          isAuthenticated: true,
          user: {
            email: res.email,
            name: res.name,
          },
        });
      }
      setAppLoading(false);
    };

    fetchAccount();
  }, []);

  // End uthentication

  const [theme, setTheme] = useState("dark");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();

  useEffect(() => {
    // Set the background color based on the theme
    document.documentElement.style.backgroundColor =
      theme === "dark" ? "#131313" : "white";
    document.documentElement.style.color = theme === "dark" ? "white" : "black";
  }, [theme]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const locationCheck = () => {
    return !location.pathname.startsWith("/trade");
  };

  return (
    <div className={`app ${theme}`}>
      {" "}
      {/* Use template literal for className */}
      <div>
        {isMobile ? (
          <MobileNavBar theme={theme} setTheme={setTheme} />
        ) : (
          <NavBar theme={theme} setTheme={setTheme} />
        )}
      </div>
      <Outlet />
      {locationCheck() && <Footer />}
      <ChatbotWidget />
    </div>
  );
}

export default App;
