import React from "react";
import Navbar from "./Navbar"; // Assuming you have a Navbar component
import Footer from "./Footer"; // Assuming you have a Footer component
import "./DestinationPage.css"; // CSS file for styling
import IdukkiTourCard from "./IdukkiTourCard";

const Idukki = ({ setPaymentDetails, paymentDetails }) => {
  return (
    <div className="Navbar">
      <Navbar />
      <div className="destination-page">
        <img
          src="./pics/idukii.jpg"
          alt="Header background"
          className="header-background"
        />
        <div className="destination-content">
          <h1>Explore Idukki</h1>
          Overview:
          <p>
            Idukki is a highland district in Kerala, known for its breathtaking
            landscapes, dense forests, and wildlife sanctuaries. It's a paradise
            for nature lovers and adventure enthusiasts.
          </p>
          Key Attractions:
          <ul>
            <li>
              <strong>Idukki Arch Dam:</strong> The largest arch dam in Asia,
              offering stunning views of the surrounding hills and valleys.
            </li>
            <li>
              <strong>Periyar Wildlife Sanctuary:</strong> A well-known wildlife
              sanctuary where you can spot elephants, tigers, and a variety of
              other wildlife species.
            </li>
            <li>
              <strong>Munnar:</strong> A popular hill station known for its tea
              plantations, rolling hills, and pleasant climate.
            </li>
            <li>
              <strong>Eravikulam National Park:</strong> Home to the endangered
              Nilgiri Tahr and offers beautiful trekking trails.
            </li>
            <li>
              <strong>Mattupetty Dam:</strong> A picturesque spot ideal for
              boating and picnicking.
            </li>
          </ul>
          Activities:
          <ul>
            <li>Wildlife safaris and nature walks</li>
            <li>Trekking and camping in the hills</li>
            <li>Exploring tea plantations and visiting tea factories</li>
            <li>Boating on lakes and dams</li>
          </ul>
          Cuisine:
          <p>
            Idukki's cuisine includes a mix of traditional Kerala dishes and
            tribal food. Popular dishes include bamboo rice, fish curry, puttu
            (steamed rice cake), and kadala curry (black chickpeas curry).
          </p>
          <h1>Packages</h1>
          <IdukkiTourCard
            title="Package 1"
            image="./pics/idukki.jpg"
            description="Description for Package 1"
            setPaymentDetails={setPaymentDetails}
            paymentDetails={paymentDetails}
          />
          <IdukkiTourCard
            title="Package 2"
            image="./pics/idukki.jpg"
            description="Description for Package 2"
            setPaymentDetails={setPaymentDetails}
            paymentDetails={paymentDetails}
          />
          <IdukkiTourCard
            title="Package 3"
            image="./pics/idukki.jpg"
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

export default Idukki;
