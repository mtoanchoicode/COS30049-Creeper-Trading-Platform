import React from "react";
import "./Icons.css"

const Icons = ({ src, alt }) => {
  return (
    <div className="icon">
      <img src={src} alt={alt} />
    </div>
  );
};

export default Icons;
