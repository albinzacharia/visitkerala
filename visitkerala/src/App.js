import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import ThingsToDo from "./components/ThingsToDo";
import Destinations from "./components/Destinations";
import LoginSignup from "./components/LoginSignup";
import ContactUs from "./components/Contactus";


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ThingsToDo" element={<ThingsToDo />} />
          <Route path="/Destinations" element={<Destinations />} />
          <Route path="/LoginSignup" element={<LoginSignup />} />
          <Route path="/Contactus" element={<ContactUs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
