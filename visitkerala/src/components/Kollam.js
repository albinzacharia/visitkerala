import React from "react";
import Navbar from "./Navbar"; // Assuming you have a Navbar component
import Footer from "./Footer"; // Assuming you have a Footer component
import "./DestinationPage.css"; // CSS file for styling
import KollamTourCard from "./KollamTourCard";

const Kollam = ({ setPaymentDetails, paymentDetails }) => {
  return (
    <div className="Navbar">
      <Navbar />
      <div className="destination-page">
        <img
          src="./pics/46-facts-about-kollam-1689066929.jpeg"
          alt="Header background"
          className="header-background"
        />
        <div className="destination-content">
          <h1>Explore Kollam</h1>
          Overview:
          <p>
            Kollam, also known as Quilon, is a coastal city in Kerala with a
            rich maritime history. It's an important trade and commerce center
            and a gateway to Kerala's backwaters. The city is known for its
            beaches, backwaters, and historical significance.
          </p>
          Key Attractions:
          <ul>
            <li>
              <strong>Ashtamudi Lake:</strong> A large lake offering picturesque
              backwater cruises. It's a perfect spot for nature lovers and bird
              watchers.
            </li>
            <li>
              <strong>Thangassery Lighthouse:</strong> A historic lighthouse
              offering panoramic views of the Arabian Sea and the surrounding
              areas.
            </li>
            <li>
              <strong>Palaruvi Waterfalls:</strong> Located in the forested
              area, this waterfall is a popular picnic spot.
            </li>
            <li>
              <strong>Thirumullavaram Beach:</strong> A tranquil beach known for
              its shallow waters and scenic beauty.
            </li>
            <li>
              <strong>Mahatma Gandhi Beach and Park:</strong> A well-maintained
              beach with a park that's ideal for evening strolls.
            </li>
          </ul>
          Activities:
          <ul>
            <li>Houseboat and backwater cruises</li>
            <li>Exploring historic forts and lighthouses</li>
            <li>Trekking and picnicking at waterfalls</li>
            <li>Beach activities and relaxation</li>
          </ul>
          Cuisine:
          <p>
            Kollam's cuisine is heavily influenced by its coastal location, with
            dishes like fish curry, prawns, squid, and other seafood delicacies.
            Traditional Kerala meals served on banana leaves are also popular.
          </p>
          <h1>
            <br />
            Packages
          </h1>
          {/* Add more details and images */}
          <KollamTourCard
            title="Package 1"
            image="./pics/kollam.jpg"
            description="Description for Package 1"
            setPaymentDetails={setPaymentDetails}
            paymentDetails={paymentDetails}
          />
          <KollamTourCard
            title="Package 2"
            image="./pics/kollam.jpg"
            description="Description for Package 2"
            setPaymentDetails={setPaymentDetails}
            paymentDetails={paymentDetails}
          />
          <KollamTourCard
            title="Package 3"
            image="./pics/kollam.jpg"
            description="Description for Package 3"
            setPaymentDetails={setPaymentDetails}
            paymentDetails={paymentDetails}
          />
          {/* Add more details and images */}
        </div>
        <div className="related-images">
          <h2>Related Images</h2>
          <div className="images">
            <img src="./pics/beach.jpg" alt="Related" />
            <img src="./pics/Gavi.jpg" alt="Related" />
            <img src="./pics/munnar.jpg" alt="Related" />
            <img src="./pics/beach.jpg" alt="Related" />
            <img src="./pics/Gavi.jpg" alt="Related" />
            <img src="./pics/munnar.jpg" alt="Related" />
          </div>
        </div>
      </div>
      <div className="Footer">
        <Footer />
      </div>
    </div>
  );
};

export default Kollam;
