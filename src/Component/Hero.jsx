import React from "react";
import "./Hero.css";
import img1 from "../images/img-1.jpg";

const Hero = () => {
  return (
    <>
      <div className="hero">
        <img src={img1} alt="" />
        <div className="hero-text">
          <h1>There Are <br /> 93,178 Postings Here For You!</h1>
          <p>Find Jobs, Employment & Career Opportunities</p>
        </div>
        <div className="hero-form">
          <input type="search" />
          <button className="hero-btn">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <div className="hero-heading">
          <h1>
            Popular Searches : <span>Designer, Developer, Web, IOS, PHP, Senior, Engineer</span>
          </h1>
        </div>
      </div>
    </>
  );
};

export default Hero;
