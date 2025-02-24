// Trivandrum.js
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./DestinationPage.css";

const Trivandrum = ({ setPaymentDetails, paymentDetails }) => {
  return (
    <div className="Navbar">
      <Navbar />
      <div className="destination-page">
        <img
          src="./pics/tvmm.jpg"
          alt="Header background"
          className="header-background"
        />
        <div className="destination-content">
          <h1>Explore Trivandrum</h1>
          Overview:
          <p>
            Trivandrum, the capital city of Kerala, is a vibrant city that
            seamlessly blends tradition with modernity. It's known for its rich
            cultural heritage, historic landmarks, and beautiful beaches.
          </p>
          Key Attractions:
          <ul>
            <li>
              <strong>Padmanabhaswamy Temple:</strong> A historic Hindu temple
              renowned for its intricate architecture and the hidden treasures
              found within.
            </li>
            <li>
              <strong>Napier Museum and Zoo:</strong> A museum showcasing a vast
              collection of historical artifacts and a zoological park with a
              variety of species.
            </li>
            <li>
              <strong>Kuthiramalika (Puthenmalika) Palace Museum:</strong> A
              palace museum with rare artifacts and exquisite architecture.
            </li>
            <li>
              <strong>Kovalam Beach:</strong> A famous beach known for its
              crescent-shaped coastline, lighthouse, and water activities.
            </li>
            <li>
              <strong>Veli Tourist Village:</strong> A popular picnic spot with
              a beautiful garden, boating facilities, and a children's park.
            </li>
          </ul>
          Activities:
          <ul>
            <li>Exploring historical and cultural landmarks</li>
            <li>Relaxing at Kovalam and other nearby beaches</li>
            <li>Boating and picnicking at Veli Tourist Village</li>
            <li>Shopping for traditional Kerala handicrafts and spices</li>
          </ul>
          Cuisine:
          <p>
            Trivandrum offers a delightful array of traditional Kerala dishes,
            including Sadhya (a festive meal served on a banana leaf), fish
            curry, appam with stew, and various vegetarian and non-vegetarian
            delicacies.
          </p>
        </div>
      </div>
      <div className="Footer">
        <Footer />
      </div>
    </div>
  );
};

export default Trivandrum;
