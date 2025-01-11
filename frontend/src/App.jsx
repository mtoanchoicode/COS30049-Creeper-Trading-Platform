import { Outlet } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Footer from "./components/Footer/Footer";
import NavBar from "./Components/NavBar/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
