import React from "react";
import Destcard from "./Destcard";
import "./Destinationscard.css"; // Add your CSS file for styling
const tours = [
  {
    title: "Kollam",
    image: "./pics/kollam.jpg", // Replace with actual image paths
    link: "/Kollam",
  },
  {
    title: "Alappuzha",
    image: "./pics/alappuzha.jpg",
    link: "/Alappuzha",
  },
  {
    title: "Ernakulam",
    image: "./pics/ernakulam.jpg",
    link: "/Ernakulam",
  },
  {
    title: "Idukki",
    image: "./pics/idukki.jpg",
    link: "/Idukki",
  },
  {
    title: "Trivandrum",
    image: "./pics/tvm.jpg",
    link: "/Trivandrum",
  },
];

const Destinationscard = () => {
  return (
    <div className="ThingsCard">
      <h2> Our favourite destinations</h2>
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
