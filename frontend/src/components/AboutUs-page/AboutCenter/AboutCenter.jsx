import React from "react";
import "./AboutCenter.css";
import globeImage from "../../../assets/about_globe.png"



const AboutCenter = ({}) => {
  return (
    <section className="AboutCenter-Container">
        <div className="AboutCenter_Above-Container">
            <div className="AboutCenter_Heading-Container"> 
                <h1>
                    Welcome to Creeper
                </h1>
                <p>
                    At Creeper, we believe that everyone should have the freedom to 
                    earn, hold, spend, share and give their money - no matter who you are or where you come from.
                </p>
            </div>

            <div className="AboutCenter_Picture-Container">
                <img src = {globeImage} alt = "globe image"></img>
            </div>
        </div>

        <div className="AboutCenter_Bottom-Container">
            <div className="AboutCenter_Blockquote-Container">
                <p className="AboutCenter_Blockquote-Tag">“</p>
                <blockquote>
                    The Creeper is the best innovation project of the Smart Contract and Defi. I believe Creeper can be better in the neer future.
                    I hope more people will join Creeper comunity to develop and get rich together"
                    <footer>- Veo (Viet Phat)</footer>
                </blockquote>
            </div>          
        </div>
    </section> 
  );
};

export default AboutCenter;






