import React from "react";
import "./TourCard.css"; // Add your CSS file for styling
const TourCard = ({ title, image, description, link }) => {
  return (
    <div className="tour-card">
      <img src={image} alt="Kollam" className="tour-card-image" />
      <div className="tour-card-content">
        <h3 className="tour-card-title">{title}</h3>
        <p className="tour-card-description">{description}</p>
        <a href={link} className="tour-card-link">
          Learn More
        </a>
      </div>
    </div>
  );
};

export default TourCard;
