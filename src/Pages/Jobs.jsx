import React, { useState, useEffect } from "react";
import "./Jobs.css";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import logo1 from "../images/logo-1.jpg";
import { NavLink } from "react-router-dom";

const Jobs = () => {
  const [data, setdata] = useState([]);
  const [filterData, setfilterData] = useState("");
  const [filterCity, setFilterCity] = useState([]);
  const [formdata, setformdata] = useState({});


  const [filteredData, setfilteredData] = useState([]);

  const users = false;

  const changedata = (event) => {
    setformdata({
      ...formdata,
      [event.target.name]: event.target.value,
    });
    console.log(formdata);
  };

  const submitdata = async () => {
    const res = await fetch("http://localhost:5000/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formdata),
    });
    const data = await res.text();
    console.log(data);
    if(!res.ok){
      alert("Failed to apply");
      window.location.href = '/login';
    }
    else{
      alert("Applied successfully");
    }
  };

  useEffect(() => {
    fetch("http://localhost:5000/jobs", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setdata(data.data);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/jobs", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setfilteredData(data.data);
      });
  }, []);

  const getData = (e) => {
    console.log(e.target.value);
    setfilterData(e.target.value);
  };

  useEffect(() => {
    const idata = data.filter((d) => {
      return d.title.toLowerCase().includes(filterData.toLowerCase());
    });

    const cdata = data.filter((d) => {
      return (
        filterCity.includes(d.location.toLowerCase()) ||
        filterCity.includes(d.category.toLowerCase())
      );
    });


    console.log("filterdata", filterData.length);

    if (filterData.length == 0 && filterCity.length == 0) {
      setfilteredData([...cdata, ...idata]);
    } else if (filterData.length == 0) {
      setfilteredData(cdata);
    } else {
      setfilteredData([...cdata, ...idata]);
    }

    // setfilteredData([...idata, ...cdata]);
  }, [filterData, filterCity]);

  const getcity = (e) => {
    if (e.target.checked && e.target.value) {
      filterCity.includes(e.target.value)
        ? setFilterCity([...filterCity])
        : setFilterCity([...filterCity, e.target.value]);
    } else {
      const cities = filterCity.filter((c) => {
        return c !== e.target.value;
      });
      setFilterCity(cities);
    }
  };


  return (
    <>
      <Navbar />
      <section className="jobs px-5">
        <h1 style={{ marginTop: "25px" }}>Jobs</h1>
        <div style={{ marginBottom: "50px" }}>
          <div className="row jobs-1">
            <div className="col-md-3 jobs-2">
              <div className="jobs-3">
                <input type="text" placeholder="Search..." onChange={getData} />
                <i class="fa-solid fa-magnifying-glass"></i>
              </div>
              <div className="jobs-4">
                <h3>Filters By City</h3>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="exampleRadios"
                    id="exampleRadios1"
                    value="banglore"
                    onClick={getcity}
                  />
                  <label class="form-check-label" for="exampleRadios1">
                    Banglore
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="exampleRadios"
                    id="exampleRadios1"
                    value="hyderabad"
                    onClick={getcity}
                  />
                  <label class="form-check-label" for="exampleRadios1">
                    Hyderabad
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="exampleRadios"
                    id="exampleRadios1"
                    value="gurgaon"
                    onClick={getcity}
                  />
                  <label class="form-check-label" for="exampleRadios1">
                    Gurgaon
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="exampleRadios"
                    id="exampleRadios1"
                    value="mumbai"
                    onClick={getcity}
                  />
                  <label class="form-check-label" for="exampleRadios1">
                    Mumbai
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="exampleRadios"
                    id="exampleRadios1"
                    value="ahemadabad"
                    onClick={getcity}
                  />
                  <label class="form-check-label" for="exampleRadios1">
                    Ahemadabad
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="exampleRadios"
                    id="exampleRadios1"
                    value="surat"
                    onClick={getcity}
                  />
                  <label class="form-check-label" for="exampleRadios1">
                    Surat
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="exampleRadios"
                    id="exampleRadios1"
                    value="pune"
                    onClick={getcity}
                  />
                  <label class="form-check-label" for="exampleRadios1">
                    Pune
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="exampleRadios"
                    id="exampleRadios1"
                    value="chennai"
                    onClick={getcity}
                  />
                  <label class="form-check-label" for="exampleRadios1">
                    Chennai
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="exampleRadios"
                    id="exampleRadios1"
                    value="delhi"
                    onClick={getcity}
                  />
                  <label class="form-check-label" for="exampleRadios1">
                    Delhi
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="exampleRadios"
                    id="exampleRadios1"
                    value="goa"
                    onClick={getcity}
                  />
                  <label class="form-check-label" for="exampleRadios1">
                    Goa
                  </label>
                </div>
              </div>
              <div className="jobs-4">
                <h3>Filters By Category</h3>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="exampleRadios"
                    id="exampleRadios1"
                    value="devops"
                    onClick={getcity}
                  />
                  <label class="form-check-label" for="exampleRadios1">
                    Devops
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="exampleRadios"
                    id="exampleRadios1"
                    value="frontend"
                    onClick={getcity}
                  />
                  <label class="form-check-label" for="exampleRadios1">
                    Frontend
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="exampleRadios"
                    id="exampleRadios1"
                    value="backend"
                    onClick={getcity}
                  />
                  <label class="form-check-label" for="exampleRadios1">
                    Backend
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="exampleRadios"
                    id="exampleRadios1"
                    value="technology"
                    onClick={getcity}
                  />
                  <label class="form-check-label" for="exampleRadios1">
                    Technology
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="exampleRadios"
                    id="exampleRadios1"
                    value="enginerring"
                    onClick={getcity}
                  />
                  <label class="form-check-label" for="exampleRadios1">
                    Engineering
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="exampleRadios"
                    id="exampleRadios1"
                    value="healthcare"
                    onClick={getcity}
                  />
                  <label class="form-check-label" for="exampleRadios1">
                    Healthcare
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="exampleRadios"
                    id="exampleRadios1"
                    value="finance"
                    onClick={getcity}
                  />
                  <label class="form-check-label" for="exampleRadios1">
                    Finance
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="exampleRadios"
                    id="exampleRadios1"
                    value="marketing"
                    onClick={getcity}
                  />
                  <label class="form-check-label" for="exampleRadios1">
                    Marketing
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="exampleRadios"
                    id="exampleRadios1"
                    value="humanresouces"
                    onClick={getcity}
                  />
                  <label class="form-check-label" for="exampleRadios1">
                    Human Resources
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="exampleRadios"
                    id="exampleRadios1"
                    value="education"
                    onClick={getcity}
                  />
                  <label class="form-check-label" for="exampleRadios1">
                    Education
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="exampleRadios"
                    id="exampleRadios1"
                    value="creativearts"
                    onClick={getcity}
                  />
                  <label class="form-check-label" for="exampleRadios1">
                    Creative Arts
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="exampleRadios"
                    id="exampleRadios1"
                    value="construction"
                    onClick={getcity}
                  />
                  <label class="form-check-label" for="exampleRadios1">
                    Construction
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="exampleRadios"
                    id="exampleRadios1"
                    value="customerservice"
                    onClick={getcity}
                  />
                  <label class="form-check-label" for="exampleRadios1">
                    Customer Service
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="exampleRadios"
                    id="exampleRadios1"
                    value="legal"
                    onClick={getcity}
                  />
                  <label class="form-check-label" for="exampleRadios1">
                    Legal
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="exampleRadios"
                    id="exampleRadios1"
                    value="hospitality"
                    onClick={getcity}
                  />
                  <label class="form-check-label" for="exampleRadios1">
                    Hospitality
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="exampleRadios"
                    id="exampleRadios1"
                    value="manufacturing"
                    onClick={getcity}
                  />
                  <label class="form-check-label" for="exampleRadios1">
                    Manufacturing
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="exampleRadios"
                    id="exampleRadios1"
                    value="researchanddevelopment"
                    onClick={getcity}
                  />
                  <label class="form-check-label" for="exampleRadios1">
                    Reserch And Development
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="exampleRadios"
                    id="exampleRadios1"
                    value="administation"
                    onClick={getcity}
                  />
                  <label class="form-check-label" for="exampleRadios1">
                    Administation
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="exampleRadios"
                    id="exampleRadios1"
                    value="realestate"
                    onClick={getcity}
                  />
                  <label class="form-check-label" for="exampleRadios1">
                    Real Estate
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="exampleRadios"
                    id="exampleRadios1"
                    value="non-profitandvolunteer"
                    onClick={getcity}
                  />
                  <label class="form-check-label" for="exampleRadios1">
                    Non-Profit And Volunteer
                  </label>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <h1>Showing Techonology of Jobs</h1>

              {filteredData.map((user) => {
                return (
                  <div className="jobs-5">
                    <div className="jobs-6">
                      <div className="jobs-icon">
                        <p>Full Time</p>
                        <i class="fa-regular fa-heart"></i>
                      </div>
                      <div className="jobs-img">
                        <img src={logo1} alt="" />
                      </div>
                      <div className="jobs-heading">
                        <h1>{user.title}</h1>
                        <p>{user.description}</p>
                        <p>{user.location}</p>
                        <p>{user.category}</p>
                        <p className="jobs-paragraph">
                          <span>
                            <i class="fa-solid fa-money-bill"></i>
                          </span>
                          <span>10 - 20</span>
                        </p>
                        <div className="jobs-button">
                          <button className="jobs-btn">
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
                            <button
                              type="button"
                              class="btn btn-primary jobs-btn-1"
                              data-bs-toggle="modal"
                              data-bs-target="#myModal"
                            >
                              Log To Apply
                            </button>
                          )}
                        </div>
                        <div class="modal" id="myModal">
                          <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content jobs-7">
                              <div class="modal-heading jobs-8">
                                <h4 class="modal-title">Upload Resume</h4>
                                <button
                                  type="button"
                                  class="btn-close"
                                  data-bs-dismiss="modal"
                                ></button>
                              </div>

                              <div>
                                {/* <div className="modal-name">
                                  <label>Your Name</label>
                                  <input
                                    type="text"
                                    name="name"
                                    onChange={changedata}
                                  />
                                </div> */}

                                <div className="modal-email">
                                  <label>Your Email</label>
                                  <input
                                    type="email"
                                    name="email"
                                    onChange={changedata}
                                  />
                                </div>

                                {/* <div className="modal-phone">
                                  <label>Your Phone</label>
                                  <input
                                    type="number"
                                    name="phone"
                                    onChange={changedata}
                                  />
                                </div> */}

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
                                    name="resume"
                                    accept="image/*"
                                    onChange={changedata}
                                  />
                                </div>
                              </div>

                              <div className="modal-button">
                                <button
                                  type="button"
                                  className="btn btn-danger"
                                  data-bs-dismiss="modal"
                                  onClick={submitdata}
                                >
                                  submit
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {/* <Jobcard /> */}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Jobs;
