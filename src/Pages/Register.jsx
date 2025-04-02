import React, { useState } from "react";
import "./Register.css";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "../Component/Navbar";
import Navbarsection from "./Navbarsection";

const Register = () => {
  // const initialValues = {fname:'' , lname : '' , email : '' , password : '' , mobilenumber : ''}
  const [formdata, setformdata] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const changedata = (event) => {
    setformdata({
      ...formdata,
      [event.target.name]: event.target.value,
    });
  };

  const submitdata = async (event) => {
    event.preventDefault();
    const errors = validate(formdata);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setIsSubmit(true);
      try {
        const res = await fetch("http://localhost:5000/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formdata),
        });
        const data = await res.text();
        console.log(data);
        navigate("/Login");
      } catch (error) {
        console.error("Error submitting data:", error);
      }
    } else {
      setIsSubmit(false);
      console.log("Validation Errors:", errors);
    }
  };

  const validate = (values) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+91[0-9]{10}$/;
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/;

    if (!values.businessgroup) {
      errors.businessgroup = "Please Select a Business Group.";
    }
    if (!values.company) {
      errors.company = "Please Select a Company.";
    }
    if (!values.jobType) {
      errors.jobType = "Please Select a JobType.";
    }
    if (!values.code) {
      errors.code = "Code is required.";
    } else if (values.code.length > 6) {
      errors.code = "Code cannot exceed 6 digits.";
    }

    if (!values.title) {
      errors.title = "Please Select a Title.";
    }
    if (!values.fname) {
      errors.fname = "First Name is required.";
    }
    if (!values.mname) {
      errors.mname = "Middle Name is required.";
    }
    if (!values.lname) {
      errors.lname = "Last Name is required.";
    }

    const today = new Date();
    if (!values.dob) {
      errors.dob = "Date of Birth is required";
    } else {
      const selectedDate = new Date(formdata.dob);
      if (selectedDate > today) {
        errors.dob = "Date of Birth cannot be in the future";
      }

      let age = today.getFullYear() - selectedDate.getFullYear();
      let monthDiff = today.getMonth() - selectedDate.getMonth();
      let dayDiff = today.getDate() - selectedDate.getDate();
      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
      }
      if (age < 18) {
        errors.dob = "You must be at least 18 years old";
      }
    }
    if (!values.adate) {
      errors.adate = "Application Date is required.";
    } else {
      const selectedDate = new Date(values.adate);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time for accurate comparison

      if (selectedDate < today) {
        errors.adate = "Application Date cannot be in the past.";
      }
    }
    if (!values.religions) {
      errors.religions = "Please Select a Religions.";
    }
    if (!values.castcategory) {
      errors.castcategory = "Please Select a Cast Category.";
    }

    if (!values.jobprofile) {
      errors.jobprofile = "Please Select a Job Profile.";
    }
    if (!values.email) {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Invalid email format.";
    }
    if (!values.pemail) {
      errors.pemail = "Email is required.";
    } else if (!emailRegex.test(values.pemail)) {
      errors.pemail = "Invalid email format.";
    }
    if (!values.aemail) {
      errors.aemail = "Email is required.";
    } else if (!emailRegex.test(values.aemail)) {
      errors.aemail = "Invalid email format.";
    }
    if (!values.bankaccount) {
      errors.bankaccount = "Bank Account Number is required.";
    } else if (
      values.bankaccount.length < 10 ||
      values.bankaccount.length > 16
    ) {
      errors.bankaccount =
        "Bank Account Number must be between 10 and 16 digits.";
    }
    if (!values.bankname) {
      errors.bankname = "Bank Name is required.";
    } else if (values.bankname.length < 3 || values.bankname.length > 30) {
      errors.bankname = "Bank Name must be between 3 and 30 characters.";
    }
    if (!values.cugno) {
      errors.cugno = "CUG Number is required.";
    } else if (!phoneRegex.test(values.cugno)) {
      errors.cugno = "Number must start with +91 and be 10 digits long.";
    }
    if (!values.directno) {
      errors.directno = "CUG Number is required.";
    } else if (!phoneRegex.test(values.directno)) {
      errors.directno = "Number must start with +91 and be 10 digits long.";
    }

    // Extension No
    if (!values.extensionno) {
      errors.extensionno = "Extension Number is required.";
    } else if (!/^\d{4}$/.test(values.extensionno)) {
      errors.extensionno = "Extension Number must be exactly 4 digits.";
    }

    if (!values.adharno) {
      errors.adharno = "Aadhar Card Number is required.";
    } else if (values.adharno.length !== 12) {
      errors.adharno = "Aadhar Card Number must be exactly 12 digits.";
    } else if (!/^\d{12}$/.test(values.adharno)) {
      errors.adharno = "Aadhar Card Number must only contain numeric digits.";
    }

    if (!values.adharfile) {
      errors.adharfile = "Aadhar Card File is required.";
    }

    const panRegEx = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!values.panno) {
      errors.panno = "PAN Card Number is required.";
    } else if (!panRegEx.test(values.panno)) {
      errors.panno =
        "Invalid PAN Card Number format. It should be in the format XXXXX1234X.";
    }

    // if (!values.voterid) {
    //   errors.voterid = "Voter ID is required when 'Voter ID Present' is checked.";
    // }
    if (!formdata.isVoterIDPresent) {
      errors.voterid = "Please confirm if Voter ID is present.";
    }
    // if (values.isVoterIDPresent && !values.voterid) {
    //   errors.voterid = "Voter ID is required if the checkbox is checked.";
    // }
    if (!values.pancardfile) {
      errors.pancardfile = "PAN Card File is required.";
    }
    if (!values.backgroundverificationfile) {
      errors.backgroundverificationfile =
        "Background Verification File is required.";
    }
    if (!values.nationality) {
      errors.nationality = "Please Select a Nationality.";
    }

    if (!values.passportno) {
      errors.passportno = "Passport No is required.";
    } else {
      const passportPattern = /^[A-Z0-9]{6,9}$/;
      if (!passportPattern.test(values.passportno)) {
        errors.passportno =
          "Invalid Passport No. It should be 6-9 characters long, and contain only letters and numbers.";
      }
    }

    if (!values.passportexpdate) {
      errors.passportexpdate = "Passport Expiry Date is required.";
    } else {
      // Check if the date format is valid
      const regex = /^\d{4}-\d{2}-\d{2}$/; // Date format YYYY-MM-DD
      if (!regex.test(values.passportexpdate)) {
        errors.passportexpdate = "Invalid date format. Use YYYY-MM-DD.";
      } else {
        // Check if the date is in the past
        const expDate = new Date(values.passportexpdate);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to compare only dates

        if (expDate < today) {
          errors.passportexpdate =
            "Passport Expiry Date cannot be in the past.";
        }
      }
    }

    if (!values.gender) {
      errors.gender = "Please select your gender.";
    }
    if (!values.maritalstatus) {
      errors.maritalstatus = "Marital status is required.";
    }
    // if (!values.password) {
    //   errors.password = "Password is required.";
    // } else if (!passwordRegex.test(values.password)) {
    //   errors.password =
    //     "Password should be at least 6 characters, with one uppercase letter and one special characters.";
    // }
    // if (!values.mobilenumber) {
    //   errors.mobilenumber = "Mobile Number is required.";
    // } else if (!phoneRegex.test(values.mobilenumber)) {
    //   errors.mobilenumber =
    //     "Mobile Number must start with +91 and be 10 digits long.";
    // }
    // if (!values.role) errors.role = "Role is required";
    // if (!values.skills.trim()) errors.skills = "Skills are required.";
    // if (!values.skills) {
    //   errors.skills = "Skills are required";
    // }
    // if (!values.experince) errors.experince = "Experience is required.";
    // if (!values.location) {
    //   errors.location = "Location is required";
    // }
    // if (!values.gender) errors.gender = "Gender is required.";

    // const urlPattern = new RegExp(
    //   "^(https?:\\/\\/)?" + // Protocol
    //     "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // Domain name
    //     "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR IP (v4) address
    //     "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // Port and path
    //     "(\\?[;&a-z\\d%_.~+=-]*)?" + // Query string
    //     "(\\#[-a-z\\d_]*)?$", // Fragment locator
    //   "i"
    // );

    // if (!values.portfolio) {
    //   errors.portfolio = "Portfolio URL is required";
    // } else if (!urlPattern.test(values.portfolio)) {
    //   errors.portfolio = "Please enter a valid URL (e.g., https://example.com)";
    // }

    // const allowedTypes = [
    //   "application/pdf",
    //   "application/msword",
    //   "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    // ];
    // const allowedExtensions = ["pdf", "doc", "docx"];
    // const maxFileSize = 20 * 1024 * 1024; // 2MB

    // if (!values.resume) {
    //   errors.resume = "Resume file is required.";
    // } else if (!allowedTypes.includes(formdata.resume.type)) {
    //   errors.resume = "Only PDF, DOC, or DOCX files are allowed.";
    // } else if (values.resume.size > maxFileSize) {
    //   errors.resume = "File size must not exceed 2MB.";
    // }

    // if (!values.preferredjoblocation) {
    //   errors.preferredjoblocation = "Location is required";
    // }

    // if (!values.jobType) errors.jobType = "JobType is required.";

    return errors;
  };

  return (
    <>
      <Navbar />
      <Navbarsection />
      <div className="register">
        <h1>Register</h1>
        <form onSubmit={submitdata}>
          <div className="form-1">
            <div className="register-businessgroup">
              <label>Business Group</label>
              <select
                name="businessgroup"
                onChange={changedata}
                value={formdata.businessgroup}
              >
                <option value="">Select Group</option>
                <option value="Aether">Aether</option>
                <option value="Tech Titans">Tech Titans</option>
                <option value="Kingmakers">Kingmakers</option>
                <option value="Brainians">Brainians</option>
                <option value="Legends">Legends</option>
              </select>
              <p className="error">{formErrors.businessgroup}</p>
            </div>
            <div className="register-company">
              <label>Company</label>
              <select
                name="company"
                onChange={changedata}
                value={formdata.company}
              >
                <option value="">Select Company</option>
                <option value="Aether Industries Limited">
                  Aether Industries Limited
                </option>
                <option value="Tata Consultancy Services">
                  Tata Consultancy Services
                </option>
                <option value="Infosys">Infosys</option>
                <option value="HCL Technologies">HCL Technologies</option>
                <option value="Wipro">Wipro</option>
                <option value="Eclerx">Eclerx</option>
                <option value="Oracle">Oracle</option>
                <option value="Cognizant">Cognizant</option>
              </select>
              <p className="error">{formErrors.company}</p>
            </div>
            <div className="register-jobType">
              <label>Type</label>
              <select
                name="jobType"
                value={formdata.jobType}
                onChange={changedata}
              >
                <option value="">Select Job Type</option>
                <option value="Permanent">Permanent</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Freelance">Freelance</option>
                <option value="Contract">Contract</option>
              </select>
              <p className="error">{formErrors.jobType}</p>
            </div>
            <div className="register-code">
              <label>Code</label>
              <input
                type="number"
                name="code"
                value={formdata.code}
                onChange={changedata}
              />
              <p className="error">{formErrors.code}</p>
            </div>
          </div>
          <div className="form-2">
            <div className="register-title">
              <label>Title</label>
              <select name="title" value={formdata.title} onChange={changedata}>
                <option value="">Select Tile</option>
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Ms">Ms</option>
                <option value="Mx">Mx</option>
              </select>
              <p className="error">{formErrors.title}</p>
            </div>
            <div className="register-fname">
              <label>First Name</label>
              <input
                type="text"
                name="fname"
                value={formdata.fname}
                onChange={changedata}
              />
              <p className="error">{formErrors.fname}</p>
            </div>
            <div className="register-mname">
              <label>Middle Name</label>
              <input
                type="text"
                name="mname"
                value={formdata.mname}
                onChange={changedata}
              />
              <p className="error">{formErrors.mname}</p>
            </div>
            <div className="register-lname">
              <label>Last Name</label>
              <input
                type="text"
                name="lname"
                value={formdata.lname}
                onChange={changedata}
              />
              <p className="error">{formErrors.lname}</p>
            </div>
          </div>
          <div className="form-3">
            <div className="register-bdate">
              <label>Birth of Date</label>
              <input
                type="date"
                name="dob"
                value={formdata.dob}
                onChange={changedata}
              />
              <p className="error">{formErrors.dob}</p>
            </div>
            <div className="register-adate">
              <label>Application Date</label>
              <input
                type="date"
                name="adate"
                value={formdata.adate}
                onChange={changedata}
              />
              <p className="error">{formErrors.adate}</p>
            </div>
            <div className="register-religions">
              <label>Religion</label>
              <select
                name="religions"
                onChange={changedata}
                value={formdata.religions}
              >
                <option value="">Select Religion</option>
                <option value="Hindu">Hindu</option>
                <option value="Muslim">Muslim</option>
                <option value="Sikh">Sikh</option>
                <option value="Christian">Christian</option>
                <option value="Other">Other</option>
              </select>
              <p className="error">{formErrors.religions}</p>
            </div>
            <div className="register-castcategory">
              <label>Caste Category</label>
              <select
                name="castcategory"
                onChange={changedata}
                value={formdata.castcategory}
              >
                <option value="">Select Caste Category</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="OBC">OBC</option>
                <option value="General">General</option>
              </select>
              <p className="error">{formErrors.castcategory}</p>
            </div>
          </div>
          <div className="form-4">
            <div className="register-jobprofile">
              <label>Job Profile</label>
              <select
                name="jobprofile"
                onChange={changedata}
                value={formdata.jobprofile}
              >
                <option value="">Select Job Profile</option>
                <option value="Fortend Developer">Fortend Developer</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="Full Stack Developer">
                  Full Stack Developer
                </option>
                <option value="IOS Developer">IOS Developer</option>
                <option value="Devops Developer">Devops Developer</option>
              </select>
              <p className="error">{formErrors.jobprofile}</p>
            </div>
            <div className="register-email">
              <label>Email Company</label>
              <input
                type="email"
                name="email"
                value={formdata.email}
                onChange={changedata}
                required
              />
              <p className="error">{formErrors.email}</p>
            </div>
            <div className="register-pemail">
              <label>Email Personal</label>
              <input
                type="email"
                name="pemail"
                value={formdata.pemail}
                onChange={changedata}
              />
              <p className="error">{formErrors.pemail}</p>
            </div>
            <div className="register-aemail">
              <label>Email 2</label>
              <input
                type="email"
                name="aemail"
                value={formdata.aemail}
                onChange={changedata}
              />
              <p className="error">{formErrors.aemail}</p>
            </div>
          </div>
          <div className="form-5">
            <div className="register-bankaccount">
              <label>Bank Account Number</label>
              <input
                type="text"
                name="bankaccount"
                value={formdata.bankaccount}
                onChange={changedata}
              />
              <p className="error">{formErrors.bankaccount}</p>
            </div>
            <div className="register-bankname">
              <label>Bank Name</label>
              <input
                type="text"
                name="bankname"
                value={formdata.bankname}
                onChange={changedata}
              />
              <p className="error">{formErrors.bankname}</p>
            </div>
            <div className="register-cugno">
              <label>CUG Number</label>
              <input
                type="text"
                name="cugno"
                value={formdata.cugno}
                onChange={changedata}
              />
              <p className="error">{formErrors.cugno}</p>
            </div>
            <div className="register-directno">
              <label>Direct Number</label>
              <input
                type="text"
                name="directno"
                value={formdata.directno}
                onChange={changedata}
              />
              <p className="error">{formErrors.directno}</p>
            </div>
          </div>
          <div className="form-6">
            <div className="register-extensionno">
              <label>Extension No</label>
              <input
                type="number"
                name="extensionno"
                value={formdata.extensionno}
                onChange={changedata}
              />
              <p className="error">{formErrors.extensionno}</p>
            </div>
            <div className="register-adharno">
              <label>Adhar Card No</label>
              <input
                type="number"
                name="adharno"
                value={formdata.adharno}
                onChange={changedata}
              />
              <p className="error">{formErrors.adharno}</p>
            </div>
            <div className="register-adharfile">
              <label>Adhar Card File</label>
              <input
                type="file"
                accept=".pdf"
                name="adharfile"
                onChange={changedata}
                value={formdata.adharfile}
              />
              <p className="error">{formErrors.adharfile}</p>
            </div>
            <div className="register-panno">
              <label>PAN Card No</label>
              <input
                type="text"
                name="panno"
                value={formdata.panno}
                onChange={changedata}
              />
              <p className="error">{formErrors.panno}</p>
            </div>
          </div>
          <div className="form-7">
            <div className="register-voterid">
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckChecked"
                  value={formdata.voterid}
                  name="isVoterIDPresent"
                  checked={formdata.isVoterIDPresent}
                  onChange={changedata}
                  required
                />
                <label class="form-check-label" for="flexSwitchCheckChecked">
                  isVoter ID Present
                </label>
                <p className="error">{formErrors.voterid}</p>
              </div>
            </div>
            <div className="register-pancardfile">
              <label>PAN Card File</label>
              <input
                type="file"
                name="pancardfile"
                onChange={changedata}
                value={formdata.pancardfile}
              />
              <p className="error">{formErrors.pancardfile}</p>
            </div>
            <div className="register-backgroundverificationfile">
              <label>Background Verification File</label>
              <input
                type="file"
                name="backgroundverificationfile"
                onChange={changedata}
                value={formdata.backgroundverificationfile}
              />
              <p className="error">{formErrors.backgroundverificationfile}</p>
            </div>
            <div className="register-nationality">
              <label>Nationality</label>
              <select
                name="nationality"
                onChange={changedata}
                value={formdata.nationality}
              >
                <option value="">Select Nationality</option>
                <option value="Indian">Indian</option>
                <option value="Other">Other</option>
              </select>
              <p className="error">{formErrors.nationality}</p>
            </div>
          </div>
          <div className="form-8">
            <div className="register-passportno">
              <label>Passport No</label>
              <input
                type="text"
                name="passportno"
                value={formdata.passportno}
                onChange={changedata}
              />
              <p className="error">{formErrors.passportno}</p>
            </div>
            <div className="register-passportexpdate">
              <label>Passport Expiry Date</label>
              <input
                type="date"
                name="passportexpdate"
                value={formdata.passportexpdate}
                onChange={changedata}
                required
              />
              <p className="error">{formErrors.passportexpdate}</p>
            </div>
            <div className="register-gender">
              <label>Gender</label>
              <div className="register-gender-1">
                <input
                  type="radio"
                  name="gender"
                  // value={formdata.gender}
                  value="Male"
                  checked={formdata.gender === "Male"}
                  onChange={changedata}
                />
                <label>Male</label>
                <input
                  type="radio"
                  name="gender"
                  // value={formdata.gender}
                  value="Female"
                  checked={formdata.gender === "Female"}
                  onChange={changedata}
                  style={{ marginLeft: "20px" }}
                />
                <label>Female</label>
                <input
                  type="radio"
                  name="gender"
                  // value={formdata.gender}
                  value="Other"
                  onChange={changedata}
                  checked={formdata.gender === "Other"}
                  style={{ marginLeft: "20px" }}
                />
                <label>Other</label>
              </div>
              <p className="error">{formErrors.gender}</p>
            </div>
            <div className="register-maritalstatus">
              <label>Marital Status</label>
              <select
                name="maritalstatus"
                onChange={changedata}
                value={formdata.maritalstatus}
              >
                <option value="">Select Marital Status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>
              <p className="error">{formErrors.maritalstatus}</p>
            </div>
          </div>
          {/* <div className="register-password">
            <label>Password</label>
            <input
              type="text"
              name="password"
              value={formdata.password}
              onChange={changedata}
            />
          </div>
          <p className="error">{formErrors.password}</p> */}
          {/* <div className="register-number">
            <label>Mobile Number</label>
            <input
              type="text"
              name="mobilenumber"
              onChange={changedata}
              value={formdata.mobilenumber}
              required
            />
          </div>
          <p className="error">{formErrors.mobilenumber}</p> */}
          {/* <div className="register-role">
            <label>Role</label>
            <select name="role" onChange={changedata} value={formdata.role}>
              <option value="">Select Role</option>
              <option value="Job Seeker">Job Seeker</option>
              <option value="Employer">Employer</option>
            </select>
          </div>
          <p className="error">{formErrors.role}</p> */}
          {/* <div className="register-skills">
            <label>Skills</label>
            <input
              type="text"
              name="skills"
              onChange={changedata}
              value={formdata.role}
              required
            />
          </div>
          <p className="error">{formErrors.skills}</p> */}
          {/* <div className="register-experince">
            <label>Experince</label>
            <select
              name="experince"
              onChange={changedata}
              value={formdata.experince}
            >
              <option value="">Select Experince</option>
              <option value="0-1">0-1 Years</option>
              <option value="1-3">1-3 Years</option>
              <option value="3-5">3-5 Years</option>
              <option value="5+">5+ Years</option>
            </select>
          </div>
          <p className="error">{formErrors.experince}</p> */}
          {/* <div className="register-location">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={formdata.location}
              onChange={changedata}
            />
          </div>
          <p className="error">{formErrors.location}</p> */}

          {/* <div className="register-portfolio">
            <label>Portfolio</label>
            <input
              type="url"
              name="portfolio"
              value={formdata.portfolio}
              onChange={changedata}
              // placeholder="https://"
            />
          </div>
          <p className="error">{formErrors.portfolio}</p> */}
          {/* <div className="register-resume">
            <label>Resume</label>
            <input
              type="file"
              name="resume"
              onChange={changedata}
              value={formdata.resume}
            />
          </div>
          <p className="error">{formErrors.resume}</p> */}
          {/* <div className="register-preferredjoblocation">
            <label>Preferred Job Location</label>
            <input
              type="text"
              name="preferredjoblocation"
              value={formdata.preferredjoblocation}
              onChange={changedata}
            />
          </div>
          <p className="error">{formErrors.preferredjoblocation}</p> */}
          {/* <div className="register-jobtype">
            <label>Job Type</label>
            <select
              name="jobType"
              value={formdata.jobType}
              onChange={changedata}
            >
              <option value="">Select Job Type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Freelance">Freelance</option>
              <option value="Contract">Contract</option>
            </select>
          </div>
          <p className="error">{formErrors.jobType}</p> */}

          <button className="register-btn" onClick={submitdata}>
            <NavLink
              // to="/Login"
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




