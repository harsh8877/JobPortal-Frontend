import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    const isLogginIn = true;
  const navLinks = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Jobs",
      link: "/jobs",
    },
  ];
  return (
    <>
      <section className="navbar-1">
        <div className="navbar-2">
          <div className="navbar-logo">
            <NavLink
              to="/"
              className="text-white text-decoration-none"
              style={{ fontWeight: "bold", fontSize: "28px" }}
            >
              Job Portal
            </NavLink>
          </div>
          <div className="navbar-3">
            <ul className="navbar-4">
              {navLinks?.map((data, index) => (
                <li key={index}>
                  <NavLink
                    to={data?.link}
                    className="text-white text-decoration-none"
                  >
                    {data?.name}
                  </NavLink>
                </li>
              ))}
              <li>
                <NavLink
                  to="/applyjob"
                  className="text-white text-decoration-none"
                >
                  Apply Job
                </NavLink>
              </li>
              {isLogginIn ? (
                <li>
                  <NavLink
                    to="/logout"
                    className="text-white text-decoration-none"
                  >
                    Log Out
                  </NavLink>
                </li>
              ) : (
                <li>
                  <NavLink
                    to="/login"
                    className="text-white text-decoration-none"
                  >
                    Login
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Navbar;
