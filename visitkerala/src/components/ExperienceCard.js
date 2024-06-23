// ExperienceCard.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./ExperienceCard.css"; // Add your CSS file for styling

const ExperienceCard = ({ title, image, description, link }) => {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    navigate(link);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top on navigation
  };

  return (
    <div className="experience-card">
      <img src={image} alt={title} className="experience-card-image" />
      <div className="experience-card-content">
        <h3 className="experience-card-title">{title}</h3>
        <p className="experience-card-description">{description}</p>
        <button onClick={handleLearnMore} className="experience-card-link">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default ExperienceCard;
