import React from "react";
import Headerttd from "./Headerttd";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./ThingsToDo.css";
import ThingsCard from "./ThingsCard";

const ThingsToDo = ({setPaymentDetails,paymentDetails}) => {
  return (
    <div className="things-to-do">
      <Navbar />
      {Navbar}
      <Headerttd /> {Headerttd}
      <ThingsCard
        setPaymentDetails={setPaymentDetails}
        paymentDetails={paymentDetails}
      />
      {ThingsCard}
      <Footer />
      {Footer}
    </div>
  );
};

export default ThingsToDo;
