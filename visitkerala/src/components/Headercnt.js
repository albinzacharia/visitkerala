import React from "react";
import "./Headercnt.css"; // Add your CSS file for styling

const Headercnt = () => {
  return (
    <header className="header">
      <div className="titlehead">
        <img
          src="./pics/kath2a.jpg"
          alt="Header background"
          className="header-background"
        />
        <div className="titletext">
          <h3>Contact Us</h3>
        </div>
      </div>
    </header>
  );
};

export default Headercnt;
