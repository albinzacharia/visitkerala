import React, { } from "react";
import "./Footer.css"; // Add your CSS file for styling
import { Link } from "react-router-dom";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2>About Us</h2>
          <p>
            Welcome to our tourism website. Discover amazing places, travel
            tips, and much more!
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
          </ul>
        </div>
        <div className="footer-section contact-form">
          <h2>Contact Us</h2>
          <form>
            <input type="email" placeholder="Your Email Address" required />
            <textarea placeholder="Your Message" required></textarea>
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; Visit Kerala 2024</p>
      </div>
    </footer>
  );
};

export default Footer;
