import React from "react";
import "./CreeperEcosystem.css";
// import Icons from "../Icons/Icons"
import { Link } from "react-router-dom";


const Ecosystem = ({Ecosystems, title, subtitle}) => {
  return (
    <section className="Our_Ecosystem-Container">
        <div className= "Our_Ecosystem-Wrapper">
            <div className = "Our_Ecosystem-Heading-Container">
                <h1 className="Heading_title-Ecosystem">
                    {title}
                </h1>
                <p className="Subtest_heading-Ecosystem">
                    {subtitle}
                </p>
            </div>

            <div className="Our_Ecosystem-Item-Container">
                {Ecosystems.map((ecosystem, index) => (
                <div className= "Ecosystem-Item" key = {index}>
                    <div className = "Ecosystem-Content-Container">
                        <div className= "Ecosystem-Image-Container">    
                            <img className= "Ecosystem-Image" alt={ecosystem.alt}  src={ecosystem.src}/>
                        </div>  

                        <div href = "/market" >
                            <div className="Ecosystem-Title">{ecosystem.Title}</div>
                        </div>
                        <p>{ecosystem.Content}</p> 
                    </div>                                       
                </div>
                ))} 
            </div>
        </div>
    </section> 
  );
};

export default Ecosystem;






