import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Jobcard.css";
import logo1 from "../images/logo-1.jpg";

const Jobcard = () => {
  const users = false;

  const [data, setdata] = useState([]);
  const [formdata, setformdata] = useState({
    email: "",
  });

  const changedata = (event) => {
    setformdata({
      ...formdata,
      [event.target.name]: event.target.value,
    });
  };

  const submitdata = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });

      if (!response.ok) {
        alert("Application failed first login then try again");
        window.location.href = "/login";
      } else {
        alert("Application Applyed successful");
        window.location.href = "/jobs";
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
  };

  // const users = false;

  useEffect(() => {
    fetch("http://localhost:5000/jobs", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setdata(data.data);
      });
  });

  return (
    <>
        <h1 style={{ textAlign: "center", marginTop: "80px" }}>Recent Jobs</h1>

      {data.map((user) => {
        return (
          <div className="jobcard">
            <div className="jobcard-1">
              <div className="jobcard-icon">
                <p>Full Time</p>
                <i class="fa-regular fa-heart"></i>
              </div>
              <div className="jobcard-img">
                <img src={logo1} alt="" />
              </div>
              <div className="jobcard-heading">
                <h1>
                  {/* Java Developer */}
                  {user.title}
                </h1>
                <p>
                  {/* Google */}
                  {user.description}
                </p>
                <p className="jobcard-paragraph">
                  <span>
                    <i class="fa-solid fa-money-bill"></i>
                  </span>
                  <span>{user.salary}</span>
                </p>
                <div className="jobcard-button">
                  <button className="jobcard-btn">
                    <NavLink
                      to="/jobdetails"
                      style={{
                        textDecoration: "none",
                        color: "black",
                      }}
                    >
                      Details
                    </NavLink>
                  </button>
                  {users ? (
                    <button>Apply</button>
                  ) : (
                    // <button className="jobcard-btn-1">Log To Apply</button>
                    <button
                      type="button"
                      class="btn btn-primary jobcard-btn-1"
                      data-bs-toggle="modal"
                      data-bs-target="#myModal"
                    >
                      Log To Apply
                    </button>
                  )}
                </div>
                <div class="modal" id="myModal">
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content jobcard-2">
                      <div class="modal-heading jobcard-3">
                        <h4 class="modal-title">Upload Resume</h4>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                        ></button>
                      </div>

                      <form onSubmit={submitdata}>
                        <div className="modal-name">
                          <label>Your Name</label>
                          <input
                            type="text"
                            name="name"
                            onChange={changedata}
                          />
                        </div>

                        <div className="modal-email">
                          <label>Your Email</label>
                          <input
                            type="email"
                            name="email"
                            onChange={changedata}
                          />
                        </div>

                        <div className="modal-phone">
                          <label>Your Phone</label>
                          <input
                            type="number"
                            name="phone"
                            onChange={changedata}
                          />
                        </div>

                        <div className="modal-address">
                          <label>Your Address</label>
                          <input
                            type="text"
                            name="address"
                            onChange={changedata}
                          />
                        </div>

                        <div className="modal-resume">
                          <label>Resume</label>
                          <input
                            type="file"
                            name="name"
                            onChange={changedata}
                          />
                        </div>
                        <input
                          type="submit"
                          value="Submit"
                          className="btn btn-danger"
                          onSubmit={submitdata}
                        />
                      </form>

                      {/* <div className="modal-button">
                        
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Jobcard;
