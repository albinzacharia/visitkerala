import React from "react";
import "./Footer.css"; // Add your CSS file for styling

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
          <ul>
            <li>
              <a href="#HomePage" onClick={scrollToTop}>
                Home
              </a>
            </li>
            <li>
              <a href="#destinations">Destinations</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
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
