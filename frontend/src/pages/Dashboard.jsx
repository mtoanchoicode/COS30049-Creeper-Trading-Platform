import React from "react";
import AccordionFQAs from "../components/Dashboard-Page/AccordionFQAs/AccordionFQAs";
import CenterComponent from "../components/Dashboard-Page/CenterDashboard/CenterDashboard";
import ConnectUs from "../components/Dashboard-Page/ConnectUs/ConnectUs";
import SmartContract from "../components/Dashboard-Page/SmartContract/SmartContract";
import FomoInput from "../components/Dashboard-Page/FomoInput/FomoInput";

const DashboardPage = () => {
  return (
    <div className="dashboard">
      <CenterComponent/>
      <SmartContract />
      <ConnectUs/>
      <AccordionFQAs/>
      <FomoInput/>
   </div>
  )
};

export default DashboardPage;
