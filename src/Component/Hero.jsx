import React from "react";
import "./Hero.css";
import img1 from "../images/img-1.jpg";

const Hero = () => {
  return (
    <>
      <div className="hero">
        <img src={img1} alt="" />
        <div className="hero-text">
          <h1>Find a Job With Your interests and Abilities</h1>
          <p>
            Find jobs that match your interests with us. Jabang provides a place
            to find your jobs
          </p>
        </div>
        <div className="hero-heading">
          <a href="/jobs">Get Started</a>
        </div>
      </div>

      <div className="work">
        <div className="work-heading">
          <h1>How it Work</h1>
          <p>
            Explore the following these steps will help you to find a job easily
          </p>
        </div>
        <div className="container">
          <div className="row work-1">
            <div className="col-md-4 work-2">
              <h4>
                Step <span>1</span>
              </h4>
              <h2>Register Account</h2>
              <div className="horizontal">
                <hr />
              </div>
              <p>First you need to make an account</p>
              <a href="/register">REGISTER ACCOUNT</a>
            </div>
            <div className="col-md-4 work-2">
              <h4>
                Step <span>2</span>
              </h4>
              <h2>Find Job</h2>
              <div className="horizontal">
                <hr />
              </div>
              <p>Second Search for the job you want</p>
              <a href="/jobs">FIND JOB</a>
            </div>
            <div className="col-md-4 work-2">
              <h4>
                Step <span>3</span>
              </h4>
              <h2>Apply Job</h2>
              <div className="horizontal">
                <hr />
              </div>
              <p>Apply to the company ans wait it</p>
              <a href="/applyjob">APPLY JOB</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
