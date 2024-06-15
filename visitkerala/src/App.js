import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import ThingsToDo from "./components/ThingsToDo";
import Destinations from "./components/Destinations";
import ContactUs from "./components/Contactus";
import LoginSignup from "./components/LoginSignup";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ThingsToDo" element={<ThingsToDo />} />
          <Route path="/Destinations" element={<Destinations />} />
          <Route path="/Contactus" element={<ContactUs />} />
          <Route path="/LoginSignup" element={<LoginSignup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
