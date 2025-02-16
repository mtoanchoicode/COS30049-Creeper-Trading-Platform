import React from "react";
import "./FounderDetails.css";
import FounderData from "./FounderDetailsData.jsx"


const FounderDetails = ({}) => {
  return (
    <section className="FounderDetails-Container">
        <div className="FounderDetails_Heading-Container"> 
                <h1>
                Our Founders
                </h1>
            </div>

            <div className="FounderDetails_Content-Container">
                {FounderData.map((founder, index) => (
                    <div className={ `FounderDetails_Block_Container ${index%2 ===0 ? "blockText1" : "blockText2" }`} key={index}> 
                        <div className="FounderName_Position-Container">
                            <div className="Founder_Image-Container">
                                <img src = {founder.Image} alt = {founder.Name + "Image"} ></img>
                            </div>

                            <div className="Founder_Name_Position">
                                <h3>{founder.Name}</h3>
                                <p>{founder.Position}</p>
                            </div>
                        </div>

                        <div className="Founder_Content-Container">
                            {founder.renderContent()}
                        </div>
                    </div>
                ))}
            </div>
    </section> 
  );
};

export default FounderDetails;






