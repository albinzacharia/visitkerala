import React, { useState, useEffect } from "react";
import "./Navbar.css"; // Add your CSS file for styling
import i4 from "./pics/logo.png";
import { Link } from "react-router-dom";

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
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <img src={i4} alt="logo" className="logos" />
      <ul className="nav-links">
        <li>
          <Link to="/" onClick={scrollToTop}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/ThingsToDo" onClick={scrollToTop}>
            Packages
          </Link>
        </li>
        <li>
          <Link to="/Destinations" onClick={scrollToTop}>
            Destinations
          </Link>
        </li>
        <li>
          <Link to="/ContactUs" onClick={scrollToTop}>
            Contact Us
          </Link>
        </li>
        <li>
          <Link to="/LoginSignup" onClick={scrollToTop}>
            Login / Signup
          </Link>
        </li>
        <li>
          <Link to="/UserProfile" onClick={scrollToTop}>
            My Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
