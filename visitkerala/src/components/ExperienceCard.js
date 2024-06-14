import React from "react";
import "./ExperienceCard.css"; // Add your CSS file for styling
const ExperienceCard = ({ title, image, description, link }) => {
  return (
    <div className="experience-card">
      <img src={image} alt="Kollam" className="experience-card-image" />
      <div className="experience-card-content">
        <h3 className="experience-card-title">{title}</h3>
        <p className="experience-card-description">{description}</p>
        <a href={link} className="experience-card-link">
          <button>Book Now</button>
        </a>
      </div>
    </div>
  );
};

export default ExperienceCard;
