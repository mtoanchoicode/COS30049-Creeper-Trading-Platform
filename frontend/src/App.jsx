import { useState } from "react";
import "./App.css";

import BuyCryptoFlow from "./Components/BuySellCryptoFlow/BuyCryptoFlow";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";


function App() {
  return (
    <>
      <NavBar />
        <BuyCryptoFlow />
      <Footer />
    </>
  );
}

export default App;
