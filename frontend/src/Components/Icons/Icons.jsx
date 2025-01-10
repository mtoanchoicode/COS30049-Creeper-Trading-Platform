import React from "react";
import "./Icons.css"

export const Icons = ({ src, alt }) => {
  return (
    <div className="icon">
      <img src={src} alt={alt} />
    </div>
  );
};
