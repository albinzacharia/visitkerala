import React, { useState, useEffect } from "react";
import "./Navbar.css"; // Add your CSS file for styling
import i4 from "./pics/logo.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <img src={i4} alt="logo" className="logos" />
      <ul className="nav-links">
        <li>
          <a href="#HomePage">Home</a>
        </li>
        <li>
          <a href="#about">Things to Do</a>
        </li>
        <li>
          <a href="#services">Destinations</a>
        </li>
        <li>
          <a href="#contact">Contact us</a>
        </li>
        <li>
          <a href="#contact">Login/Signup</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
