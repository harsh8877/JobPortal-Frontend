import React, { useState, useEffect } from "react";
import "./Applyjob.css";
import Navbar from "./Navbar";

const Applyjob = () => {
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
  });
  return (
    <>
      <Navbar />

      <div className="applyjob">
        <div className="applyjob-1">
          <h3>Apply Job</h3>
          <div className="applyjob-2">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th colSpan={2}>Action</th>
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
                      <td>
                        <i class="fa-solid fa-pen-to-square"></i>
                      </td>
                      <td>
                        <i class="fa-solid fa-trash"></i>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Applyjob;
