import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="footer-logo">
          <h1>Job Portal</h1>
        </div>
        <div className="footer-1 container-fluid">
          <div className="row footer-2">
            <div className="col-md-3 footer-3">
              <a href="/">Home</a>
              <br />
              <a href="/jobs">Job</a>
              <br />
              <a href="/applyjob">Apply Job</a>
              <br />
              <a href="/login">Login</a>
              <br />
              <a href="/register">Register</a>
            </div>
            <div className="col-md-3 footer-3">
              <a href="#">Inquiry</a>
              <br />
              <a href="#">Get i touch</a>
              <br />
              <a href="#">Contact</a>
              <br />
              <a href="#">Services</a>
              <br />
            </div>
            <div className="col-md-3 footer-3">
              <a href="#">Inquiry</a>
              <br />
              <a href="#">Get i touch</a>
              <br />
              <a href="#">Contact</a>
              <br />
              <a href="#">Services</a>
              <br />
            </div>
            <div className="col-md-3 footer-3">
              <a href="#">Tables</a>
              <br />
              <a href="#">Feeds</a>
              <br />
              <a href="#">Form Layouts</a>
              <br />
              <a href="#">Select Menus</a>
              <br />
              <a href="#">Radio Groups</a>
              <br />
              <a href="#">Checkboxes</a>
            </div>
          </div>
        </div>
        <div className="footer-4">
          <span>Follows : </span>
          <div className="footer-icon">
            <i class="fa-brands fa-facebook-f"></i>
            <i class="fa-brands fa-twitter"></i>
            <i class="fa-brands fa-linkedin-in"></i>
            <i class="fa-brands fa-instagram"></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
