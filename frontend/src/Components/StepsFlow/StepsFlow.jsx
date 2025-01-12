import React from "react";
import './StepsFlow.css';
import  Icons from "../Icons/Icons";
import WhiteArrow from "../../assets/White-arrow.svg";



const Steps = ({ steps, title }) => {
    return (
        <div className="Steps_container">
            <div className="Steps_heading_container" >
                <h1 className="Steps_title">{title}</h1>
            </div>

            <div className="Allsteps_container">
                {steps.map((step, index) => (
                    <div key={index} className="Steps_content_container">
                        <div className="Steps_item">
                            <div className="Step-img_container">
                                <img className="Step-img" src={step.src} alt={step.alt} />
                            </div>
                            <p className="Step-desc">{step.desc}</p>
                        </div>

                        {index < steps.length - 1 &&
                            <div className="Steps_arrow">
                                <Icons src={WhiteArrow} alt="white arrow" />
                            </div>
                        }
                    </div>
                ))}
            </div>
        </div>
    );
};


export default Steps;
