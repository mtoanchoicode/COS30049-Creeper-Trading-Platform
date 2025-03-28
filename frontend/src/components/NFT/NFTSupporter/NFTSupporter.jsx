import React from "react";
import "./NFTSupporter.css";

import slider1 from "../../../assets/slider_1.png";
import slider2 from "../../../assets/slider_2.png";
import slider3 from "../../../assets/slider_3.png";
import slider4 from "../../../assets/slider_4.png";
import slider5 from "../../../assets/slider_5.png";
import slider6 from "../../../assets/slider_6.png";
import slider7 from "../../../assets/slider_7.png";
import slider8 from "../../../assets/slider_8.png";
import slider9 from "../../../assets/slider_9.png";
import slider10 from "../../../assets/slider_10.png";

const NFTSupporter = () => {
  const images = [
    slider1,
    slider2,
    slider3,
    slider4,
    slider5,
    slider6,
    slider7,
    slider8,
    slider9,
    slider10,
  ];

  return (
    <div className="nft-supporter">
      <div className="nft-supporter-header">
        <h2>Supported by</h2>
        <p>Our data providers and partners</p>
      </div>
      <div
        className="nft-supporter-slider"
        style={{
          "--width": "100px",
          "--height": "50px",
          "--quantity": "10",
        }}
      >
        <div className="list">
          {images.map((image, index) => (
            <div
              className="item"
              key={index}
              style={{ "--position": index + 1 }}
            >
              <img src={image} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NFTSupporter;
