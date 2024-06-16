import React from "react";
import Destcard from "./Destcard";
import "./Destinationscard.css"; // Add your CSS file for styling
const tours = [
  {
    title: "Kollam",
    image: "./pics/kollam.jpg", // Replace with actual image paths
    link: "/Trivandrum",
  },
  {
    title: "Alappuzha",
    image: "./pics/alappuzha.jpg",
    link: "/Trivandrum",
  },
  {
    title: "Kappad",
    image: "./pics/Kappad.jpg",
    link: "/Trivandrum",
  },
  {
    title: "Palakkad",
    image: "./pics/palakkad.jpg",
    link: "/Trivandrum",
  },
  {
    title: "Thrissur",
    image: "./pics/thrish.jpg",
    link: "/Trivandrum",
  },
  {
    title: "Kollam",
    image: "./pics/kollam.jpg", // Replace with actual image paths
    link: "/Trivandrum",
  },
  {
    title: "Alappuzha",
    image: "./pics/alappuzha.jpg",
    link: "/Trivandrum",
  },
  {
    title: "Trivandrum",
    image: "./pics/tvm.jpg",
    link: "/Trivandrum",
  },
  {
    title: "Palakkad",
    image: "./pics/palakkad.jpg",
    link: "/Trivandrum",
  },
  {
    title: "Thrissur",
    image: "./pics/thrish.jpg",
    link: "/Trivandrum",
  },
  // Add more tour objects as needed
];

const Destinationscard = () => {
  return (
    <div className="ThingsCard">
      <h2>Top Destinations</h2>
      <div className="dest-card-container">
        {tours.map((tour, index) => (
          <Destcard
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

export default Destinationscard;
