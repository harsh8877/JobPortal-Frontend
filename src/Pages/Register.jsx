import React, { useState } from "react";
import "./Register.css";
import { NavLink } from "react-router-dom";
import Navbar from "../Component/Navbar";

const Register = () => {
  const [formdata, setformdata] = useState({});

  const changedata = (event) => {
    setformdata({
      ...formdata,
      [event.target.name]: event.target.value,
    });
  };

  const submitdata = async () => {
    const res = await fetch("http://localhost:5000/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formdata),
    });
    const data = await res.text();
    console.log(data);
  };

  return (
    <>
      <Navbar />
      <div className="register">
        <h1>Register</h1>
        <form onSubmit={submitdata}>
          <div className="register-fname">
            <label>First Name</label>
            <input type="text" name="fname" onChange={changedata} />
          </div>
          <div className="register-lname">
            <label>Last Name</label>
            <input type="text" name="lname" onChange={changedata} />
          </div>
          <div className="register-email">
            <label>Email</label>
            <input type="email" name="email" onChange={changedata} />
          </div>
          <div className="register-password">
            <label>Password</label>
            <input type="text" name="password" onChange={changedata} />
          </div>
          {/* <div className="register-password">
              <label>Location</label>
              <input type="text" name="location" onChange={changedata} />
            </div> */}
          <div className="register-number">
            <label>Mobile Number</label>
            <input type="number" name="mobilenumber" onChange={changedata} />
          </div>
          <button className="register-btn" onClick={submitdata}>
            <NavLink
              to="/Login"
              style={{ color: "white", textDecoration: "none" }}
            >
              Register Now
            </NavLink>
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
