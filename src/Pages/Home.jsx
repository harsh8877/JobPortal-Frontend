import React from "react";
import Hero from "../Component/Hero";
import Jobcard from "../Component/Jobcard";
// import Footer from "../Component/Footer";
import Navbar from "../Component/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />

      <Hero />

      <Jobcard />

      {/* <Footer /> */}
    </>
  );
};

export default Home;