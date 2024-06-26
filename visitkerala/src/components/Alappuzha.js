import React from "react";
import Navbar from "./Navbar"; // Assuming you have a Navbar component
import Footer from "./Footer"; // Assuming you have a Footer component
import "./DestinationPage.css"; // CSS file for styling
import AlappuzhaTourCard from "./AlappuzhaTourCard";

const Alappuzha = ({ setPaymentDetails, paymentDetails }) => {
  return (
    <div className="Navbar">
      <Navbar />
      <div className="destination-page">
        <img
          src="./pics/ttdh1.jpg"
          alt="Header background"
          className="header-background"
        />
        <div className="destination-content">
          <h1>Explore Alappuzha</h1>
          Overview:
          <p>
            Alappuzha, often referred to as the "Venice of the East," is a
            picturesque town in Kerala, known for its stunning backwaters,
            houseboats, and serene beaches. It is a hub of Kerala's backwater
            tourism and offers a tranquil escape amidst lush green landscapes
            and serene waters.
          </p>
          Key Attractions:
          <ul>
            <li>
              <strong>Alleppey Backwaters:</strong> A network of canals,
              lagoons, and lakes that can be explored on traditional houseboats.
              It's a perfect way to experience the tranquil beauty of Kerala's
              countryside.
            </li>
            <li>
              <strong>Alappuzha Beach:</strong> Known for its beautiful sunset
              views, a historic lighthouse, and the remains of the Alappuzha Sea
              Bridge.
            </li>
            <li>
              <strong>Marari Beach:</strong> A quiet, clean, and less crowded
              beach ideal for a peaceful retreat.
            </li>
            <li>
              <strong>Revi Karunakaran Museum:</strong> A museum showcasing a
              rich collection of artifacts, including Swarovski crystals, ivory,
              and Tanjore paintings.
            </li>
            <li>
              <strong>Kumarakom Bird Sanctuary:</strong> Located nearby, this
              sanctuary is a haven for bird watchers.
            </li>
          </ul>
          Activities:
          <ul>
            <li>Houseboat cruises through the backwaters</li>
            <li>Canoeing and kayaking</li>
            <li>Beach activities and water sports</li>
            <li>Visiting traditional coir-making industries</li>
          </ul>
          Cuisine:
          <p>
            Alappuzha's cuisine is a treat for seafood lovers, with dishes like
            Karimeen Pollichathu (pearl spot fish), prawn curry, and a variety
            of traditional Kerala delicacies like appam, stew, and tapioca with
            fish curry.
          </p>
          <h1>Packages</h1>
          <AlappuzhaTourCard
            title="Package 1"
            image="./pics/alappuzha.jpg"
            description="Description for Package 1"
            setPaymentDetails={setPaymentDetails}
            paymentDetails={paymentDetails}
          />
          <AlappuzhaTourCard
            title="Package 2"
            image="./pics/alappuzha.jpg"
            description="Description for Package 2"
            setPaymentDetails={setPaymentDetails}
            paymentDetails={paymentDetails}
          />
          <AlappuzhaTourCard
            title="Package 3"
            image="./pics/alappuzha.jpg"
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

export default Alappuzha;
