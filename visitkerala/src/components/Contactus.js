import React from "react";
import Headercnt from "./Headercnt";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Contactusform from "./Contactusform";

const ContactUs = () => {
  return (
    <div className="contactus">
      <Navbar />
      {Navbar}
          <Headercnt /> {Headercnt}
          <Contactusform />{ Contactusform}
      <Footer />
      {Footer}
    </div>
  );
};

export default ContactUs;
