import React, { useState } from "react";
import "./LimitExpired.css"

const LimitExpired = () => {
  const [active, setActive] = useState("day");

  return (
    <div className="limit-expiry">
      <div className="limit-expiry-title">Expiry</div>
      <div className="limit-expiry-btns">
        <button
          onClick={() => setActive("day")}
          className={active === "day" ? "active" : ""}
        >
          1 day
        </button>
        <button
          onClick={() => setActive("week")}
          className={active === "week" ? "active" : ""}
        >
          1 week
        </button>
        <button
          onClick={() => setActive("month")}
          className={active === "month" ? "active" : ""}
        >
          1 month
        </button>
        <button
          onClick={() => setActive("year")}
          className={active === "year" ? "active" : ""}
        >
          1 year
        </button>
      </div>
    </div>
  );
};

export default LimitExpired;
