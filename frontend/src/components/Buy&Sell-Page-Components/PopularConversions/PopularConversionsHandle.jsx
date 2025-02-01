import React from "react";
import "./PopularConversions.css";
// import Icons from "../Icons/Icons"
import { Link } from "react-router-dom";


const Conversions = ({conversions, title, subtitle}) => {
  return (
    <section className="Popular_Conversions-Container">
        <div className= "Popular_Conversions-Wrapper">
            <div className = "Popular_Conversions-Heading-Container">
                <h1 className="Heading_title-Conversions">
                    {title}
                </h1>
                <p className="Subtest_heading-Conversions">
                    {subtitle}
                </p>
            </div>

            <div className="Popular_Conversions-Item-Container">
                {conversions.map((conversion, index) => (
                <div className= "Conversions-Item" key = {index}>
                    <div className = "Conversions-Link-Container">
                        <Link href = "/market" >
                            <div className="Conversiosn-Link">{conversion.LinkTitle}</div>
                        </Link>
                        <p>{conversion.PriceDifference}</p> 
                    </div>  

                    <div className= "Conversions-Image-Container">    
                        <img className= "Conversions-Image" alt={conversion.alt_1}  src={conversion.src_1}/>
                        <img className= "Conversions-Image" alt={conversion.alt_2}  src={conversion.src_2}/>
                    </div>                      
                </div>
                ))} 
            </div>
        </div>
    </section> 
  );
};

export default Conversions;






