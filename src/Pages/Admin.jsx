import React, { useEffect, useState } from "react";
import "./Admin.css";
import { NavLink } from "react-router-dom";
import icon1 from "../images/icon-1.png";
import Navbar from "../Component/Navbar";

const Admin = () => {
  const [data, setdata] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setdata(data.data);
      });
  });

  // const logout = () => {
  //   window.localStorage.clear();
  //   window.location.href('./Login');
  // }

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
                    Category
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
                      <th>Id</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Password</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((user) => {
                      return (
                        <tr>
                          <td>{user._id}</td>
                          <td>{user.fname}</td>
                          <td>{user.lname}</td>
                          <td>{user.email}</td>
                          <td>{user.password}</td>
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

export default Admin;
