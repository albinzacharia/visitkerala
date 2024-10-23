import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./ThingsToDo.css";
import ThingsCard from "./ThingsCard";
import axios from "axios";
import Headerttd from "./Headerttd";

const ThingsToDo = ({ setPaymentDetails, paymentDetails }) => {
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const location = useLocation();

  useEffect(() => {
    fetchTours();
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const destination = queryParams.get("destination");

    if (destination) {
      // Filter tours based on destination if it exists
      const filtered = tours.filter((tour) =>
        tour.description.toLowerCase().includes(destination.toLowerCase())
      );
      setFilteredTours(filtered);
    } else {
      setFilteredTours(tours); // No destination filter, show all tours
    }
  }, [tours, location.search]);

  const fetchTours = () => {
    axios
      .get("http://localhost:3001/api/tours")
      .then((response) => {
        setTours(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tours:", error);
      });
  };

  return (
    <div className="things-to-do">
      <Navbar />
      <Headerttd/>
      <h2>Our Packages</h2>
      <div className="things-card-container">
        {filteredTours.length > 0 ? (
          filteredTours.map((tour, index) => (
            <ThingsCard
              key={index}
              title={tour.title}
              description={tour.description}
              imageUrl={`http://localhost:3001/${tour.imageUrl}`} // Adjust URL if needed
              link={`/tour/${tour.id}`} // Adjust link as per your routing
              setPaymentDetails={setPaymentDetails}
              paymentDetails={paymentDetails}
            />
          ))
        ) : (
          <p>No tours available for the selected destination.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ThingsToDo;
