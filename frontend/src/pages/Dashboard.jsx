import React from "react";
import AccordionFQAs from "../components/Dashboard-Page/AccordionFQAs/AccordionFQAs";
import CenterComponent from "../components/Dashboard-Page/CenterDashboard/CenterDashboard"
const DashboardPage = () => {
  return (
    <div className="dashboard">
      <CenterComponent/>
      <AccordionFQAs/>
   </div>
  )
};

export default DashboardPage;
