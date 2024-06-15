import React from "react";
import "./Header.css"; // Add your CSS file for styling

const Headerdst = () => {
  return (
    <header className="header">
      <div className="titlehead">
        <img
          src="./pics/beach2.jpg"
          alt="Header background"
          className="header-background"
        />
        <div className="titletext">
          <h3>Destinations</h3>
        </div>
      </div>
    </header>
  );
};

export default Headerdst;
