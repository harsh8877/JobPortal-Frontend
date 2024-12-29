import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { NavLink } from "react-router-dom";
import icon1 from "../images/icon-1.png";
import "./Dashboardjob.css";

const Dashboardjob = () => {
  const [formdata, setformdata] = useState({});
  const [data, setdata] = useState([]);
  const [job, setJob] = useState({});
  const [editObject, setEditObject] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    category: "",
    id: "",
  });
  const [showModal, setShowModal] = useState(false);
  console.log(editObject);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditObject((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const closeModal = () => {
    setShowModal(false);
    setEditObject({
      title: "",
      description: "",
      location: "",
      salary: "",
      category: "",
    }); // Reset the form data when closing
  };

  const changedata = (event) => {
    setformdata({
      ...formdata,
      [event.target.name]: event.target.value,
    });
  };

  const submitdata = async () => {
    const res = await fetch("http://localhost:5000/dashboardjob", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formdata),
    });
    const data = await res.text();
    console.log(data);
  };

  useEffect(() => {
    fetch("http://localhost:5000/dashboardjob", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setdata(data.data);
      });
  }, []);

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/deleteUser/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log(`users after delete ${data}`);

      // if(response.ok)
      // {
      //   deleteUser();
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const editJob = async (id) => {
    try {
      // seteditObject({
      //   title: title,
      //   description: description,
      //   location: location,
      //   salary: salary,
      //   category: category,
      // });

      const response = await fetch(`http://localhost:5000/job/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();

      console.log(id);

      setEditObject({
        title: data.title,
        description: data.description,
        location: data.location,
        salary: data.salary,
        category: data.category,
        id: id,
      });

      setShowModal(true);

      // seteditObject(data.title);
    } catch (error) {
      console.log(error);
    }
  };

  const editQuery = async () => {
    console.log(editObject.id);
    const res = await fetch(`http://localhost:5000/update/${editObject.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editObject),
    });
    const data = await res.text();
    console.log(data);
    setShowModal(false);
  };

  return (
    <>
      <Navbar />

      <div className="dashboardjob">
        <div className="row dashboardjob-1">
          <div className="col-md-3 dashboardjob-2">
            <div className="dashboardjob-img">
              <img src={icon1} alt="" />
            </div>
            <div className="dashboardjob-link">
              <div className="dashboardjob-user">
                <i class="fa-solid fa-user"></i>
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
              <div className="dashboardjob-job">
                <i class="fa-solid fa-user"></i>
                <button>
                  <NavLink
                    to="/dashborard"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Jobs
                  </NavLink>
                </button>
              </div>
              <br />
              <div className="dashboardjob-category">
                <i class="fa-solid fa-user"></i>
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
          <div className="col-md-9 dashboardjob-3">
            <div className="dashboardjob-4">
              <h3>DashBoard</h3>
              <button
                type="button"
                class="btn dashboardjob-btn"
                data-bs-toggle="modal"
                data-bs-target="#myModal"
              >
                Create a Job
              </button>
              <div class="modal" id="myModal">
                <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content dashboardjob-6">
                    <div class="modal-heading dashboardjob-7">
                      <h4 class="modal-title">Create a Job</h4>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                      ></button>
                    </div>

                    <div>
                      <div className="modal-name">
                        <label>Title</label>
                        <input type="text" name="title" onChange={changedata} />
                      </div>

                      <div className="modal-email">
                        <label>Description</label>
                        <input
                          type="email"
                          name="description"
                          onChange={changedata}
                        />
                      </div>

                      <div className="modal-phone">
                        <label>Salary</label>
                        <input
                          type="number"
                          name="salary"
                          onChange={changedata}
                        />
                      </div>

                      <div className="modal-address">
                        <label>Location</label>
                        <input
                          type="text"
                          name="location"
                          onChange={changedata}
                        />
                      </div>

                      <div className="dashboardjob-category-1">
                        <label>Category</label>
                        <select
                          class="form-select form-select-lg"
                          name="category"
                          onChange={changedata}
                        >
                          <option name="category"></option>
                          <option name="category">Frontend</option>
                          <option name="category">Backend</option>
                          <option name="category">Devops</option>
                          <option name="category">FullStack Developer</option>
                          <option name="category">IOS Developer</option>
                          <option name="category">Android Developer </option>
                        </select>
                      </div>
                    </div>

                    <div className="modal-button">
                      <button
                        type="button"
                        className="btn btn-danger"
                        data-bs-dismiss="modal"
                        onClick={submitdata}
                        // onSubmit={handleSubmit}
                      >
                        submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="dashboradjob-5">
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Salary</th>
                      <th>Location</th>
                      <th>Category</th>
                      <th colSpan={2}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((user) => {
                      return (
                        <tr>
                          <td>{user.title}</td>
                          <td>{user.description}</td>
                          <td>{user.salary}</td>
                          <td>{user.location}</td>
                          <td>{user.category}</td>
                          <td>
                            <button
                              type="button"
                              className="btn dashboardjob-button"
                              onClick={() => editJob(user._id)} // Use the appropriate user ID here
                            >
                              <i className="fa-solid fa-pen-to-square"></i>
                            </button>

                            {/* Modal - Only visible if `showModal` is true */}
                            {showModal && (
                              <div
                                className="modal show"
                                // id="myModal"
                                style={{ display: "block" }}
                                aria-labelledby="myModalLabel"
                                aria-hidden="false"
                              >
                                <div className="modal-dialog modal-dialog-centered">
                                  <div className="modal-content dashboardjob-6">
                                    <div className="modal-heading dashboardjob-7">
                                      <h4 className="modal-title">Edit Job</h4>
                                      <button
                                        type="button"
                                        className="btn-close"
                                        onClick={closeModal} // Close the modal when clicked
                                      ></button>
                                    </div>

                                    <div>
                                      <div className="modal-name">
                                        <label>Title</label>
                                        <input
                                          type="text"
                                          name="title"
                                          value={editObject.title}
                                          onChange={handleChange} // Handle changes in title
                                        />
                                      </div>

                                      <div className="modal-email">
                                        <label>Description</label>
                                        <input
                                          type="text"
                                          name="description"
                                          value={editObject.description}
                                          onChange={handleChange} // Handle changes in description
                                        />
                                      </div>

                                      <div className="modal-phone">
                                        <label>Salary</label>
                                        <input
                                          type="number"
                                          name="salary"
                                          value={editObject.salary}
                                          onChange={handleChange} // Handle changes in salary
                                        />
                                      </div>

                                      <div className="modal-address">
                                        <label>Location</label>
                                        <input
                                          type="text"
                                          name="location"
                                          value={editObject.location}
                                          onChange={handleChange} // Handle changes in location
                                        />
                                      </div>

                                      <div className="dashboardjob-category-1">
                                        <label>Category</label>
                                        <select
                                          className="form-select form-select-lg"
                                          name="category"
                                          value={editObject.category}
                                          onChange={handleChange} // Handle changes in category
                                        >
                                          <option value="">
                                            Select Category
                                          </option>
                                          <option value="Frontend">
                                            Frontend
                                          </option>
                                          <option value="Backend">
                                            Backend
                                          </option>
                                          <option value="Devops">Devops</option>
                                          <option value="FullStack Developer">
                                            FullStack Developer
                                          </option>
                                          <option value="IOS Developer">
                                            IOS Developer
                                          </option>
                                          <option value="Android Developer">
                                            Android Developer
                                          </option>
                                        </select>
                                      </div>
                                    </div>

                                    <div className="modal-footer">
                                      <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={closeModal} // Close the modal when clicked
                                      >
                                        Close
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() => editQuery(user._id)}
                                      >
                                        Save Changes
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* <i class="fa-solid fa-pen-to-square"></i> */}
                          </td>
                          <td>
                            <i
                              class="fa-solid fa-trash"
                              onClick={() => deleteUser(user._id)}
                            ></i>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboardjob;
