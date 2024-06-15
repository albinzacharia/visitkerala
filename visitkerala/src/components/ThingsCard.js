import React from "react";
import TourCard from "./TourCard";
import "./ThingsCard.css"; // Add your CSS file for styling
const tours = [
  {
    title: "Beautiful Beaches of Goa",
    image: "./pics/kollam.jpg", // Replace with actual image paths
    description: "Explore the stunning beaches and vibrant nightlife of Goa.",
    link: "/tours/goa",
  },
  {
    title: "Majestic Mountains of Manali",
    image: "./pics/alappuzha.jpg",
    description:
      "Experience the serene beauty and adventurous activities in Manali.",
    link: "/tours/manali",
  },
  {
    title: "Majestic Mountains of Manali",
    image: "./pics/munnar.jpg",
    description:
      "Experience the serene beauty and adventurous activities in Manali.",
    link: "/tours/manali",
  },
  {
    title: "Majestic Mountains of Manali",
    image: "./pics/palakkad.jpg",
    description:
      "Experience the serene beauty and adventurous activities in Manali.",
    link: "/tours/manali",
  },
  {
    title: "Majestic Mountains of Manali",
    image: "./pics/thrish.jpg",
    description:
      "Experience the serene beauty and adventurous activities in Manali.",
    link: "/tours/manali",
  },
  // Add more tour objects as needed
];

const ThingsCard = () => {
  return (
    <div className="ThingsCard">
      <h2>Things to Do in Kerala</h2>
      <div className="things-card-container">
        {tours.map((tour, index) => (
          <TourCard
            key={index}
            title={tour.title}
            image={tour.image}
            description={tour.description}
            link={tour.link}
          />
        ))}
      </div>
    </div>
  );
};

export default ThingsCard;
