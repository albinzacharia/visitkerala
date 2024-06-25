import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css"; // Add your CSS file for styling
import i2 from "./pics/pexels.jpg";

const Header = () => {
  const [destination, setDestination] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (destination) {
      navigate(`/${destination}`);
    }
  };
const today = new Date().toISOString().split("T")[0];
  return (
    <header className="header">
      <div className="titlehead">
        <img src={i2} alt="Header background" className="header-background" />
        <div className="titletext">
          <h3>Explore God's own country!</h3>
        </div>
      </div>
      <div className="search-bar">
        <select
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Select Destination"
        >
          <option value="">Select Destination</option>
          <option value="Trivandrum">Trivandrum</option>
          <option value="Kollam">Kollam</option>
          <option value="Ernakulam">Ernakulam</option>
          <option value="Alappuzha">Alappuzha</option>
          <option value="Idukki">Idukki</option>
        </select>
        <input
          type="text"
          placeholder="Enter Date"
          min={today}
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => (e.target.type = "text")}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </header>
  );
};

export default Header;
