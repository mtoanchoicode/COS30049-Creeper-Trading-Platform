import React from "react";
import "./NavIcon.css"

export const NavIcon = ({ src, alt }) => {
  return (
    <div className="navbar-icon">
      <img src={src} alt={alt} />
    </div>
  );
};
