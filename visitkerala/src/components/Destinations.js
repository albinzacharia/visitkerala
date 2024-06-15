import React from "react";
import Headerdst from "./Headerdst";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Destinationscard from "./Destinationscard";
import "./Destinationscard.css"

const Destinations = () => {
  return (
    <div className="destinations">
      <Navbar />
      {Navbar}
      <Headerdst/> {Headerdst}
      <Destinationscard />
      {Destinationscard}
      <Footer />
      {Footer}
    </div>
  );
};

export default Destinations;
