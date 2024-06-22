// src/components/Navbar.js
import React, { useState, useEffect } from "react";
import "./Navbar.css"; // Add your CSS file for styling
import i4 from "./pics/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext"; // Import the authentication context

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isLoggedIn, logout } = useAuth(); // Get the login state and logout function from the context
  const navigate = useNavigate();

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

  const handleLogout = () => {
    logout();
    navigate("/LoginSignup");
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
        {!isLoggedIn && (
          <li>
            <Link to="/LoginSignup" onClick={scrollToTop}>
              Login / Signup
            </Link>
          </li>
        )}
        {isLoggedIn && (
          <>
            <li>
              <Link to="/UserProfile" onClick={scrollToTop}>
                My Profile
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
