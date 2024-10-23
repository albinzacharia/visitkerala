// ExperienceList.js
import React from "react";
import ExperienceCard from "./ExperienceCard";
import "./ExperienceList.css"; // Ensure you have a CSS file for styling

const experience = [
  {
    title: "Trivandrum: Gateway to Kerala's Capital",
    image: "./pics/tvmm.jpg", // Replace with actual image paths
    description:
      "Explore Trivandrum, the capital city of Kerala, known for its vibrant culture, historical landmarks, and lush greenery.",
    link: "/Trivandrum",
  },
  {
    title: "Kollam: Backwaters Bliss",
    image: "./pics/kollam.jpg",
    description:
      "Discover Kollam, a serene destination famous for its tranquil backwaters, pristine beaches, and cultural heritage.",
    link: "/Kollam",
  },
  {
    title: "Alappuzha: Venice of the East",
    image: "./pics/kerala-travel-guide-header-m.jpg",
    description:
      "Experience Alappuzha, known as the 'Venice of the East,' with its enchanting backwaters, houseboat cruises, and traditional culture.",
    link: "/Alappuzha",
  },
  {
    title: "Idukki: Nature's Paradise",
    image: "./pics/idukki.jpg",
    description:
      "Immerse yourself in the natural beauty of Idukki, home to lush hills, tea plantations, and the famous Idukki Arch Dam.",
    link: "/Idukki",
  },
  {
    title: "Ernakulam: Bustling Metropolis",
    image: "./pics/ernakulamheader.jpg",
    description:
      "Explore Ernakulam, the bustling commercial hub of Kerala, offering a blend of modernity, cultural heritage, and culinary delights.",
    link: "/Ernakulam",
  },
  // Add more experience objects as needed
];

const ExperienceList = () => {
  return (
    <div className="experiencelist">
      <h2>Top Destinations</h2>
      <div className="experience-container">
        {experience.map((experienceItem, index) => (
          <ExperienceCard
            key={index}
            title={experienceItem.title}
            image={experienceItem.image}
            description={experienceItem.description}
            link={experienceItem.link}
          />
        ))}
      </div>
    </div>
  );
};

export default ExperienceList;
