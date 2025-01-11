import { Outlet } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
import NavTrade from "./Components/NavTrade/NavTrade";

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
