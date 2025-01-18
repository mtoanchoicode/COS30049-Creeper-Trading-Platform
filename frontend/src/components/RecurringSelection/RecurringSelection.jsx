import React, { useState } from "react";
import "./RecurringSelection.css";

const RecurringSelection = () => {
  const [activeSelection, setActiveSelection] = useState(false);
  const [frequencySelection, setFrequencySelection] = useState("Hourly");
  const [daySelection, setDaySelection] = useState("Monday");

  const frequencies = ["Hourly", "Daily", "Weekly", "Bi-weekly", "Monthly"];
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleFrequencySelection = (freq) => {
    setFrequencySelection(freq);
    if (!["Weekly", "Bi-weekly", "Monthly"].includes(freq)) {
      setActiveSelection(false);
    }
  };

  const handleDaySelection = (day) => {
    setDaySelection(day);
    setActiveSelection(false);
  };

  return (
    <div className="recurring-selection">
      <div
        className="recurring-selection-main"
        onClick={() => setActiveSelection(!activeSelection)}
      >
        <div className="recurring-selection-main-left">
          <p>Frequency</p>
        </div>
        <div className="recurring-selection-main-right">
          <p>
            {["Weekly", "Bi-weekly", "Monthly"].includes(frequencySelection)
              ? `${frequencySelection}, ${daySelection}`
              : frequencySelection}
          </p>

          <i
            className={`fa-solid fa-chevron-${activeSelection ? "up" : "down"}`}
          ></i>
        </div>
      </div>

      {activeSelection && (
        <div className="recurring-selection-container">
          <div className="recurring-selection-container-left recurring-selection-container-wrap">
            <div className="recurring-selection-container-title">
              <p>Frequency</p>
            </div>
            <div className="recurring-selection-container-list">
              {frequencies.map((freq) => (
                <p
                  key={freq}
                  className={`recurring-selection-container-list-item ${
                    frequencySelection === freq ? "selected" : ""
                  }`}
                  onClick={() => handleFrequencySelection(freq)}
                >
                  {freq}
                  {frequencySelection === freq && (
                    <i className="fa-solid fa-check"></i>
                  )}
                </p>
              ))}
            </div>
          </div>

          {["Weekly", "Bi-weekly", "Monthly"].includes(frequencySelection) && (
            <div className="recurring-selection-container-right recurring-selection-container-wrap">
              <div className="recurring-selection-container-title">
                <p>Day</p>
              </div>
              <div className="recurring-selection-container-list">
                {days.map((day) => (
                  <p
                    key={day}
                    className={`recurring-selection-container-list-item ${
                      daySelection === day ? "selected" : ""
                    }`}
                    onClick={() => handleDaySelection(day)}
                  >
                    {day}
                    {daySelection === day && (
                      <i className="fa-solid fa-check"></i>
                    )}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RecurringSelection;
