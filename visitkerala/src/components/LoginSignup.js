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

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignup = (e) => {
    e.preventDefault();
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
        } else {
          navigate("/user-profile"); // Redirect to user profile page
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
});
        onClose();
        navigate("/user-profile");
  };

  const [isLogin, setIsLogin] = useState(true);
  const [fade, setFade] = useState(true);

  const toggleForm = () => {
    setFade(false);
    setTimeout(() => {
      setIsLogin(!isLogin);
      setFade(true);
    }, 600);
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
