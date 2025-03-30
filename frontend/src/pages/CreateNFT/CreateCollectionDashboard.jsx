import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
//import "./CreateCollectionDashBoard.css";
import { Button, Form, Input } from "antd";

const CreateCollectionDashBoard = () => {
    return(
        <section 
        style={{ 
            marginTop: "7rem", 
            padding: "1rem", 
            height: "fit-content",
        }}
        >  
            <Outlet />
      </section>
    )   
  };
  
  export default CreateCollectionDashBoard;

 