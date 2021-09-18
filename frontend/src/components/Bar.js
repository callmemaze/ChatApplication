import React from "react";

import onlineIcon from "../assets/icons/onlineIcon.png";
import closeIcon from "../assets/icons/closeIcon.png";

import "./style/Bar.css";

const Bar = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={onlineIcon} alt="online icon" />
      <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
      <a href="/">
        <img src={closeIcon} alt="close icon" />
      </a>
    </div>
  </div>
);

export default Bar;
