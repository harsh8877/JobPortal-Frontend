import React, { useState } from "react";
import "./Login.css";
import { NavLink } from "react-router-dom";
import Navbar from "../Component/Navbar";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    console.log(user);
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        alert("Something went wrong. Please try again.");
        // window.location.reload();
        window.location.href = '/login';
      } else {
        alert("Logged in successfully");
        window.location.href = "/";
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
        <div className="login">
          <h1>Login</h1> <br />
          <form action="/submit" onSubmit={handleSubmit}>
            <div className="form-email">
              <label>Email address</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                id="email"
                // autoComplete="email"
                placeholder="Your Email"
              />
            </div>
            <div className="form-password">
              <label>Password</label>
              <input
                type="text"
                name="password"
                value={user.password}
                onChange={handleChange}
                id="password"
                placeholder="Your Password"
              />
            </div>
            <button type="submit" className="login-btn">
              <NavLink
                to="/"
                style={{ textDecoration: "none", color: "white" }}
                onClick={handleSubmit}
              >
                Sign In
              </NavLink>
            </button>
          </form>
          <p className="login-text">
            Create a new account{" "}
            <NavLink to="/register" className="login-link">
              Register
            </NavLink>
          </p>
        </div>
    </>
  );
};

export default Login;
