import React from "react";
import "./Button.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Button = ({ children, type, onClick }) => (
  <div className="form-group">
    <button type={type} onClick={onClick}>
      {children}
    </button>
  </div>
);

Button.defaultProps = {
  type: "submit",
};

const GoalButton = ({ onClick, icon, buttonText }) => (
  <button className="button icon-with-text" onClick={onClick}>
    <FontAwesomeIcon icon={icon} />
    <span className="button-text">{buttonText}</span>
  </button>
);

export { GoalButton, Button };
