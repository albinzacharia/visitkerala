import React from "react";
import Navbar from "./Navbar"; // Assuming you have a Navbar component
import Footer from "./Footer"; // Assuming you have a Footer component
import "./DestinationPage.css"; // CSS file for styling
import ErnakulamTourCard from "./ErnakulamTourCard";

const Ernakulam = ({setPaymentDetails, paymentDetails}) => {
  return (
    <div className="Navbar">
      <Navbar />
      <div className="destination-page">
        <img
          src="./pics/ernakulamheader.jpg"
          alt="Header background"
          className="header-background"
        />
        <div className="destination-content">
          <h1>Explore Ernakulam</h1>
          Overview:
          <p>
            Ernakulam, part of the greater Kochi city, is a bustling
            metropolitan area known for its historical significance, cultural
            diversity, and modern amenities. It is often referred to as the
            commercial capital of Kerala.
          </p>
          Key Attractions:
          <ul>
            <li>
              <strong>Fort Kochi:</strong> A historic area with colonial
              architecture, Chinese fishing nets, and the vibrant Fort Kochi
              Beach.
            </li>
            <li>
              <strong>Jewish Synagogue:</strong> One of the oldest active
              synagogues, located in the Jew Town area of Mattancherry.
            </li>
            <li>
              <strong>Mattancherry Palace:</strong> Also known as the Dutch
              Palace, it showcases Kerala murals and artifacts.
            </li>
            <li>
              <strong>Marine Drive:</strong> A picturesque promenade with
              stunning views of the backwaters and the cityscape.
            </li>
            <li>
              <strong>St. Francis Church:</strong> One of the oldest European
              churches in India, where Vasco da Gama was originally buried.
            </li>
          </ul>
          Activities:
          <ul>
            <li>Exploring historical and cultural sites</li>
            <li>Strolling along Marine Drive and enjoying boat rides</li>
            <li>Shopping for spices, antiques, and handicrafts in Jew Town</li>
            <li>
              Enjoying the vibrant art scene, including the Kochi-Muziris
              Biennale
            </li>
          </ul>
          Cuisine:
          <p>
            Ernakulam offers a diverse culinary scene, featuring traditional
            Kerala dishes, seafood delicacies, and a variety of international
            cuisines. Must-try dishes include Kerala fish curry, appam with
            stew, and biryani.
          </p>
          <h1>Packages</h1>
          <ErnakulamTourCard
            title="Package 1"
            image="./pics/ernakulam.jpg"
            description="Description for Package 1"
            setPaymentDetails={setPaymentDetails}
            paymentDetails={paymentDetails}
          />
          <ErnakulamTourCard
            title="Package 2"
            image="./pics/ernakulam.jpg"
            description="Description for Package 2"
            setPaymentDetails={setPaymentDetails}
            paymentDetails={paymentDetails}
          />
          <ErnakulamTourCard
            title="Package 3"
            image="./pics/ernakulam.jpg"
            description="Description for Package 3"
            setPaymentDetails={setPaymentDetails}
            paymentDetails={paymentDetails}
          />
          {/* Add more details and images */}
        </div>
      </div>
      <div className="Footer">
        <Footer />
      </div>
    </div>
  );
};

export default Ernakulam;
