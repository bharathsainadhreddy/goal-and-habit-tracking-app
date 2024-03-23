import React from "react";
import "./Popup.css";

const Popup = ({ message, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-content">
          <p>{message}</p>
          <button onClick={onClose} className="popup-close-button">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
