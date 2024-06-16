import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginSignup.css";
import { useAuth } from "../AuthContext"; // Import the authentication context

const LoginSignup = ({ onClose, setPaymentDetails }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const [isLogin, setIsLogin] = useState(true);
  const [fade, setFade] = useState(true);
  const { login } = useAuth(); // Get the login function from the context
  const navigate = useNavigate(); // Get the navigate function

  const toggleForm = () => {
    setFade(false);
    setTimeout(() => {
      setIsLogin(!isLogin);
      setFade(true);
    }, 600);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    login();
    onClose();
    navigate("/");
  };

  return (
    <div className={`form-container ${fade ? "fade-in" : "fade-out"}`}>
      <div className="background-image"></div>
      <button className="modal-close" onClick={onClose}>
        &times;
      </button>
      <img src="./pics/logo.png" alt="logo" className="loginlogo" />
      {isLogin ? (
        <div className="login-form">
          <h2>Sign in to Visit Kerala</h2>
          <p>Enjoy easy booking and our customer care</p>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              onChange={handleChange}
              required
            />
            <input type="password" placeholder="Enter password" required />
            <div className="remember-me">
              <input type="checkbox" id="rememberMe" />
              <label className="login" htmlFor="rememberMe">
                Remember Me
              </label>
            </div>
            <button className="continuebutton" type="submit">
              Continue
            </button>
          </form>
          <p>
            Don't Have An Account?{" "}
            <span className="toggle-link" onClick={toggleForm}>
              Sign Up
            </span>
          </p>
        </div>
      ) : (
        <div className="signup-form">
          <h2>Sign up to Visit Kerala</h2>
          <p>Enjoy easy booking and our customer care</p>
          <form>
            <input type="text" placeholder="Enter username" required />
            <input type="email" placeholder="Enter email address" required />
            <input type="password" placeholder="Enter password" required />
            <button className="signup" type="submit">
              Sign Up
            </button>
          </form>
          <p>
            Already Have An Account?{" "}
            <span className="toggle-link" onClick={toggleForm}>
              Sign In
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default LoginSignup;
