import React from "react";
import './Button.css'

const Button = ({ name, width, height }) => {
  return (
    <div className="button" style={{ width, height }}>
      <button>{name}</button>
    </div>
  );
};

export default Button;
