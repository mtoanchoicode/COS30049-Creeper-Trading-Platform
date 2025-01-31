import React from "react";
import AccordionFQAs from "../components/Dashboard-Page/AccordionFQAs/AccordionFQAs";
import CenterComponent from "../components/Dashboard-Page/CenterDashboard/CenterDashboard"
import ConnectUs from "../components/Dashboard-Page/ConnectUs/ConnectUs"
const DashboardPage = () => {
  return (
    <div className="dashboard">
      <CenterComponent/>
      <ConnectUs/>
      <AccordionFQAs/>
   </div>
  )
};

export default DashboardPage;
