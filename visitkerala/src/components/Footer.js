import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Footer = () => {
  const { isAdmin,isTourManager } = useAuth();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2>About Us</h2>
          <p>
            Welcome to Visit Kerala, your number one source for all things
            travel. We're dedicated to providing you the very best of tourism
            packages, with an emphasis on customer satisfaction, unique
            experiences, and seamless travel plans.
          </p>
          <p>
            We hope you enjoy our packages as much as we enjoy offering them to
            you. If you have any questions or comments, please don't hesitate to
            contact us.
          </p>
        </div>
        <div className="footer-section links">
          <h2>Quick Links</h2>
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
            {!isAdmin && !isTourManager && (
              <li>
                <Link to="/ContactUs" onClick={scrollToTop}>
                  Contact Us
                </Link>
              </li>
            )}
            <li>
              <Link to="/LoginSignup" onClick={scrollToTop}>
                Login / Signup
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; Visit Kerala 2024</p>
      </div>
    </footer>
  );
};

export default Footer;
