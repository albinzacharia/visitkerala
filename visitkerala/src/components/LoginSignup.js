import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginSignup.css";
import { useAuth } from "../AuthContext";
import axios from "axios";

const LoginSignup = ({ onClose, setPaymentDetails }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    firstname: "",
    password: "",
  });
  const [error, setError] = useState(""); // State for error message
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate phone number
    if (name === "phone" && (value.length > 10 || isNaN(value))) {
      setError("Phone number must be 10 digits");
    } else {
      setError("");
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();

    // Check phone number length before making the request
    if (formData.phone.length !== 10) {
      setError("Phone number must be 10 digits");
      return;
    }

    axios
      .post("http://localhost:3001/api/register", formData)
      .then((response) => {
        console.log("Signup successful:", response.data);
        const { username, email, phone, firstname } = formData;
        const userData = { username, email, phone, firstname };
        login(userData);
        setPaymentDetails((prevDetails) => ({
          ...prevDetails,
          username: formData.username,
        }));
        onClose();
        navigate("/user-profile");
      })
      .catch((error) => {
        console.error("Error signing up:", error);
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/login", formData)
      .then((response) => {
        console.log("Login successful:", response.data);
        const userData = response.data.user;
        login(userData);
        setPaymentDetails((prevDetails) => ({
          ...prevDetails,
          username: formData.username,
        }));
        if (formData.username === "admin" && formData.password === "admin") {
          navigate("/AdminPage"); // Redirect to admin page
        } else if (
          formData.username === "tourmanager" &&
          formData.password === "tourmanager"
        ) {
          navigate("/TourCoordinatorPage");
        } else {
          navigate("/user-profile"); // Redirect to user profile page
        }
        onClose();
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        setError("Invalid username or password"); // Set error message
      });
  };

  const [isLogin, setIsLogin] = useState(true);
  const [fade, setFade] = useState(true);

  const toggleForm = () => {
    setFade(false);
    setTimeout(() => {
      setIsLogin(!isLogin);
      setFade(true);
    }, 600);
    setError(""); // Clear error message when toggling forms
  };

  return (
    <div className={`form-container ${fade ? "fade-in" : "fade-out"}`}>
      <div className="background-image"></div>
      <button className="modal-close" onClick={onClose}>
        &times;
      </button>
      {isLogin ? (
        <div className="login-form">
          <img src="./pics/logo.png" alt="logo" className="loginlogo" />
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
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={handleChange}
              required
            />
            <button className="continuebutton" type="submit">
              Continue
            </button>
            {error && <p className="error-message">{error}</p>}{" "}
            {/* Display error message */}
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
          <img src="./pics/logo.png" alt="logo" className="signuplogo" />
          <h2>Sign up to Visit Kerala</h2>
          <p>Enjoy easy booking and our customer care</p>
          <form onSubmit={handleSignup}>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Enter email address"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Enter Phone number"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="firstname"
              placeholder="Enter your name"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={handleChange}
              required
            />
            <button className="signup" type="submit">
              Sign Up
            </button>
            {error && <p className="error-message">{error}</p>}{" "}
            {/* Display error message */}
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
