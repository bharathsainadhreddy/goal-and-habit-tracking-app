// Sidebar.js

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faBars,
  faSignOutAlt,
  faCog,
  faShoppingCart,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { GoalButton } from "../Button/Button";
import "./Goals.css";

const Sidebar = ({ signOut, userName, setShowPopup }) => {
  return (
    <div className="sidebar">
      <div className="username">
        <div id="fa-circle-user">
          <FontAwesomeIcon icon={faCircleUser} />
        </div>
        <div id="userName">{userName ? "Hi, " + userName : "Hi, User "}</div>
        <div id="fa-Bars">
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div>
      <hr />
      <div className="goal-list">
        <h6>Features</h6>
        <GoalButton
          className="button icon-with-text"
          onClick={() => setShowPopup(true)}
          icon={faCalendar}
          buttonText="Calendar"
        />
      </div>

      <div className="actions">
        <hr />
        <GoalButton
          className="button icon-with-text"
          onClick={() => setShowPopup(true)}
          icon={faCog}
          buttonText="Settings"
        />
        <GoalButton
          className="button icon-with-text"
          onClick={() => signOut()}
          icon={faSignOutAlt}
          buttonText="Sign Out"
        />
        <GoalButton
          className="button icon-with-text"
          onClick={() => setShowPopup(true)}
          icon={faShoppingCart}
          buttonText="Shop"
        />
      </div>
    </div>
  );
};

export default Sidebar;
