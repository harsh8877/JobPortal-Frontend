import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Applyjob.css";
import Navbar from "./Navbar";

const Applyjob = () => {
  const [data, setdata] = useState([]);
  const [formdata, setformdata] = useState({});
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [resumes, setResumes] = useState("");

  console.log("Resume3y372", resumes);

  // console.log("res", resumes);
  // const [job, setJob] = useState({});
  const [editObject, setEditObject] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    file: "",
    id: "",
  });
  const [showModal, setShowModal] = useState(false);
  // console.log(editObject);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditObject((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditObject({
      name: "",
      email: "",
      phone: "",
      address: "",
      file: "",
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
    // console.log(data);
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

  const editJob = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/applyjob/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();

      console.log(id);

      setEditObject({
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        // file: filedata.resumes.resumeUrl,
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
    const res = await fetch(`http://localhost:5000/edit/${editObject.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editObject),
    });
    const data = await res.text();
    // console.log(data);

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("userId", editObject.id);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/upload-resume",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setUploadStatus(`File uploaded successfully: ${response.data.fileUrl}`);
    } catch (error) {
      setUploadStatus("Error uploading file");
    }

    setShowModal(false);
  };

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

  useEffect(() => {
    fetch("http://localhost:5000/resumes", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        console.log("resumes", data);
        setResumes(data.resumes);
      });
  }, []);

  useEffect(() => {
    data.forEach((user) => {
      const id = user._id;
      const resume = resumes.find((resume) => resume.userId === id);
      console.log("resume new", resume);

      if (resume) {
        user.file = resume.resumeUrl;
        const newData = data.filter((d) => d._id !== user.id);
        newData.push(user);
        setdata(newData);
      }

      console.log("userrrr", user);

      // user.file = resume.resumeUrl;
    });
  }, [resumes]);

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
                  <th>Resume</th>
                  <th>Action</th>
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
                        <a
                          target="_blank"
                          href={user.file}
                          rel="noopener noreferrer"
                        >
                          Open Resume
                        </a>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn dashboardjob-button"
                          onClick={() => editJob(user._id)}
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>

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
                                    <label>Name</label>
                                    <input
                                      type="text"
                                      name="name"
                                      value={editObject.name}
                                      onChange={handleChange} // Handle changes in title
                                    />
                                  </div>

                                  <div className="modal-email">
                                    <label>Email</label>
                                    <input
                                      type="email"
                                      name="email"
                                      value={editObject.email}
                                      onChange={handleChange} // Handle changes in description
                                    />
                                  </div>

                                  <div className="modal-phone">
                                    <label>Phone</label>
                                    <input
                                      type="number"
                                      name="phone"
                                      value={editObject.phone}
                                      onChange={handleChange} // Handle changes in salary
                                    />
                                  </div>

                                  <div className="modal-address">
                                    <label>Address</label>
                                    <input
                                      type="text"
                                      name="address"
                                      value={editObject.address}
                                      onChange={handleChange} // Handle changes in location
                                    />
                                  </div>

                                  <div className="modal-address">
                                    <label>resume</label>
                                    <input
                                      type="file"
                                      name="file"
                                      value={editObject.file}
                                      onChange={onFileChange} // Handle changes in location
                                    />
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
