import React from "react";
import Navbar from "./Navbar"; // Assuming you have a Navbar component
import Footer from "./Footer"; // Assuming you have a Footer component
import "./DestinationPage.css"; // CSS file for styling

const Trivandrum = () => {
    return (
      <div className="Navbar">
        <Navbar />
        <div className="destination-page">
          <img
            src="./pics/wildlife_sancturay.jpg"
            alt="Header background"
            className="header-background"
          />
          <div className="destination-content">
            <h1>Explore Idukki</h1>
            <p>
              Goa is known for its stunning beaches, vibrant nightlife, and
              Portuguese heritage. Whether you're looking to relax on the
              beaches or party till dawn, Goa has something for everyone. Goa is
              known for its stunning beaches, vibrant nightlife, and Portuguese
              heritage. Whether you're looking to relax on the beaches or party
              till dawn, Goa has something for everyone.Goa is known for its
              stunning beaches, vibrant nightlife, and Portuguese heritage.
              Whether you're looking to relax on the beaches or party till dawn,
              Goa has something for everyone.Goa is known for its stunning
              beaches, vibrant nightlife, and Portuguese heritage. Whether
              you're looking to relax on the beaches or party till dawn, Goa has
              something for everyone.Goa is known for its stunning beaches,
              vibrant nightlife, and Portuguese heritage. Whether you're looking
              to relax on the beaches or party till dawn, Goa has something for
              everyone.
            </p>
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

export default Trivandrum;
