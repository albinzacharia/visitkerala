import React from "react";
import "./Header.css"; // Add your CSS file for styling
import i2 from "./pics/pexels.jpg";
import i3 from "./pics/logo.png";

const Header = () => {
  return (
    <header className="header">
      <div className="titlehead">
        <img src={i2} alt="Header background" className="header-background" />
        <img src={i3} alt="logo" className="logo" />
        <div className="titletext">
          <h3>Explore God's own country!</h3>
        </div>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Enter Destination" />
        <input
          type="text"
          placeholder="Enter Date"
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => (e.target.type = "text")}
        />
        <button>Search</button>
      </div>
    </header>
  );
};

export default Header;
