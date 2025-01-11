import React from "react";
import './StepsFlow.css';


const Steps= ({steps, title}) => {
    return (
        <div className="Steps_container">
            <div className = "Steps_heading_container" >
                <h1 className= "Steps_title">{title}</h1>
            </div>

            <div className="Allsteps_container">
                {steps.map((step, index) => (
                    <div key = {index} className= "Steps_content_container">
                        <div className= "Steps_item">
                            <img className = "Step-icon" src={step.src} alt={step.alt} />
                            <p className = "Step-desc">{step.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default Steps;
