import React, { useEffect, useState } from "react";
import "./Reporting.css";
import Navbar from "../Component/Navbar";
import Navbarsection from "./Navbarsection";
import axios from "axios";

const Reporting = () => {
  const [formdata, setFormData] = useState({
    designation: "",
    reportdesignation: "",
    reportingemployee: "",
    active: "",
  });
  const [users, setUsers] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/Report", formdata)
      .then((result) => console.log(result.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/getreports")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <Navbar />
      <Navbarsection />
      <div className="reporting">
        <div className="reporting-1">
          <div className="reporting-2">
            <h6>Employee Reporting Detail</h6>
            <button
              type="button"
              className="border-0"
              data-bs-toggle="modal"
              data-bs-target="#myModal"
            >
              <i class="fa-solid fa-plus"></i>
            </button>
            <div class="modal" id="myModal">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content jobs-7">
                  <div class="modal-heading jobs-8">
                    <h4 class="modal-title">Employee Report</h4>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                    ></button>
                  </div>

                  <div>
                    <div className="modal-email">
                      <label>Designation</label>
                      <input
                        type="text"
                        name="designation"
                        onChange={handleChange}
                        value={formdata.designation}
                      />
                    </div>

                    <div className="modal-address">
                      <label>Reporting Designation</label>
                      <input
                        type="text"
                        name="reportdesignation"
                        onChange={handleChange}
                        value={formdata.reportdesignation}
                      />
                    </div>

                    <div className="modal-resume">
                      <label>Reporting Employee</label>
                      <input
                        type="text"
                        name="reportingemployee"
                        onChange={handleChange}
                        value={formdata.reportingemployee}
                      />
                    </div>

                    <div className="modal-email">
                      <label>Active</label>
                      <select
                        name="active"
                        onChange={handleChange}
                        value={formdata.active}
                      >
                        <option value="">Select</option>
                        <option value="1">Yes</option>
                        <option value="2">No</option>
                      </select>
                    </div>
                  </div>

                  <div className="modal-button">
                    <button
                      type="button"
                      className="btn btn-danger"
                      data-bs-dismiss="modal"
                      onClick={handleSubmit}
                    >
                      submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="reporting-3">
            <div className="reporting-4">
              <input type="search" placeholder="Search" />
              <i class="fa-solid fa-magnifying-glass"></i>
            </div>
            <i class="fa-solid fa-xmark"></i>
            <i class="fa-solid fa-arrows-rotate"></i>
          </div>
        </div>

        <hr />

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Designation</th>
              <th>Reporting Designation</th>
              <th>Reporting Employee</th>
              <th>Active</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.designation}</td>
                <td>{user.reportdesignation}</td>
                <td>{user.reportingemployee}</td>
                <td>{user.active}</td>
                <td>
                  <i class="fa-solid fa-trash"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Reporting;
