import React from "react";
import "./Jobdetails.css";
import Navbar from "../Component/Navbar";

const Jobdetails = () => {
  return (
    <>
      <Navbar />
      <div className="jobdetails">
        <div className="jobdetails-1">
          <h1>Description</h1>
          <p>
            Develop and maintain web applications using JavaScript, ReactJs ,
            NodeJs and MongoDB.
          </p>
          <h2>Required Skills</h2>
          <div className="skills">
            <a href="#">Javascript</a>
            <a href="#">ReactJs</a>
            <a href="#">NodeJs</a>
            <a href="#">MongoDB</a>
          </div>
          <div className="skills-1">
            <h5>
              Role : <span>Developer</span>
            </h5>
            <h5>
              Industry Type : <span>Tech Solutins Ltd.</span>
            </h5>
            <h5>
              Department : <span>Technology</span>
            </h5>
            <h5>
              Employment Type : <span>Full - time</span>
            </h5>
            <h5>
              Role Category : <span>Technology</span>
            </h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default Jobdetails;
