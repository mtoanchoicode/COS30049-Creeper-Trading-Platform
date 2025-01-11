import { useState } from "react";
import "./App.css";
import { NavBar } from "./components/NavBar/NavBar";
import BuyCryptoFlow  from "./Components/BuyCryptoFlow/BuyCryptoFlow";

function App() {
  return (
    <>
      <NavBar />
      <BuyCryptoFlow/>
    </>
  );
}

export default App;
