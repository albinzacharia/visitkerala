import React from "react";
import Header from "./Header"; // Import the Header component
import "./HomePage.css"; // Add your CSS file for styling if needed
import Featured from "./Featured";
import ExperienceList from "./ExperienceList";
import Navbar from "./Navbar";
import Footer from "./Footer";

const HomePage = () => {
  return (
    <div className="home-page">
      <Navbar />
      {Navbar}
      <Header /> {Header}
      <Featured />
      {Featured}
      <ExperienceList />
          {ExperienceList}
          <Footer />
          { Footer}
    </div>
  );
};

export default HomePage;
