import React from "react";
import ExperienceCard from "./ExperienceCard";
import "./ExperienceList.css"; // Add your CSS file for styling
const experience = [
  {
    title: "Beautiful Beaches of Goa",
    image: "./pics/kollam.jpg", // Replace with actual image paths
    description: "Explore the stunning beaches and vibrant nightlife of Goa.",
    link: "/Trivandrum",
  },
  {
    title: "Majestic Mountains of Manali",
    image: "./pics/alappuzha.jpg",
    description:
      "Experience the serene beauty and adventurous activities in Manali.",
    link: "/Kollam",
  },
  {
    title: "Majestic Mountains of Manali",
    image: "./pics/munnar.jpg",
    description:
      "Experience the serene beauty and adventurous activities in Manali.",
    link: "/Alappuzha",
  },
  {
    title: "Majestic Mountains of Manali",
    image: "./pics/palakkad.jpg",
    description:
      "Experience the serene beauty and adventurous activities in Manali.",
    link: "Ernakulam",
  },
  {
    title: "Majestic Mountains of Manali",
    image: "./pics/thrish.jpg",
    description:
      "Experience the serene beauty and adventurous activities in Manali.",
    link: "/Idukki",
  },
  // Add more experience objects as needed
];

const ExperienceList = () => {
  return (
    <div className="experiencelist">
      <h2>Top Destinations</h2>
      <div className="experience-container">
        {experience.map((experience, index) => (
          <ExperienceCard
            key={index}
            title={experience.title}
            image={experience.image}
            description={experience.description}
            link={experience.link}
          />
        ))}
      </div>
    </div>
  );
};

export default ExperienceList;
