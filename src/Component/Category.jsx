import React from "react";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { NavLink } from "react-router-dom";
import icon1 from "../images/icon-1.png";

const Category = () => {
  const [data, setdata] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/applyjob", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setdata(data.data);
      });
  }, []);

  return (
    <>
      <Navbar />

      <div className="dashboard">
        <div className="row dashboard-1">
          <div className="col-md-3 dashboard-2">
            <div className="dashboard-img">
              <img src={icon1} alt="" />
            </div>
            <div className="dashboard-link">
              <div className="dashboard-user">
                <i class="fa-solid fa-user-tag"></i>
                <button>
                  <NavLink
                    to="/admin"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Users
                  </NavLink>
                </button>
              </div>
              <br />
              <div className="dashboard-job">
                <i class="fa-solid fa-bag-shopping"></i>
                <button>
                  <NavLink
                    to="/dashboardjob"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Jobs
                  </NavLink>
                </button>
              </div>
              <br />
              <div className="dashboard-category">
                <i class="fa-solid fa-icons"></i>
                <button>
                  <NavLink
                    to="/category"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Category(Apply)
                  </NavLink>
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-9 dashboard-3">
            <div className="dashboard-4">
              <h3>DashBoard</h3>
              <div className="dashboard-5">
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Address</th>
                      <th>Resume</th>
                      {/* <th>Action</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((user) => {
                      return (
                        <tr>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.phone}</td>
                          <td>{user.address}</td>
                          {/* <td>{user.resume}</td> */}
                          <td>
                            <a
                              target="_blank"
                              href={user.file}
                              rel="noopener noreferrer"
                            >
                              Open Resume
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {/* <button onClick={logout}>
                  Log Out
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
