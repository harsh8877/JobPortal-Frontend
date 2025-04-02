import React from "react";
import { NavLink } from "react-router-dom";

const Navbarsection = () => {
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav d-flex justify-content-center align-items-center gap-4">
              <li class="nav-item">
                <NavLink
                  class="nav-link active"
                  aria-current="page"
                  to="/Register"
                  style={{ textDecoration: "none" }}
                >
                  Register
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink
                  class="nav-link"
                  to="/Residental"
                  style={{ textDecoration: "none" }}
                >
                  Residental
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink
                  class="nav-link"
                  to="/Reporting"
                  style={{ textDecoration: "none" }}
                >
                  Reporting
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbarsection;
