import React from "react";
import "./Destcard.css"; // Add your CSS file for styling

const Destcard = ({ title, image, link }) => {
  return (
    <div className="dest-card">
      <a href={link} className="dest-card-link">
        <img src={image} alt={title} className="dest-card-image" />
      </a>
      <h3 className="dest-card-title">{title}</h3>
    </div>
  );
};

export default Destcard;
