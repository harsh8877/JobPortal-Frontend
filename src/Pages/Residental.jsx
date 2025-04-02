import React, { useState } from "react";
import "./Residental.css";
import Navbar from "../Component/Navbar";
import Navbarsection from "./Navbarsection";
// import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Residental = () => {
  const [formData, setFormData] = useState({
    address1: "",
    address2: "",
    address3: "",
    country: "",
    state: "",
    city: "",
    house: "",
    vehicletype: "",
    monthyear: "",
    drivinglicenseno: "",
    drivinglicensephoto: "",
    latitude: "",
    pincode: "",
    mobile: "",
    home: "",
    // copyaddress1: "",
    // copyaddress2: "",
    // copyaddress3: "",
    // copycountry: "",
    // copystate: "",
    // copycity: "",
    // copyhouse: "",
  });
  const [formerror, setFormError] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const fetchLatitude = async (address) => {
    if (!address) return; // Prevent empty requests
    const apiKey = "YOUR_GOOGLE_MAPS_API_KEY"; // Replace with your API Key
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "OK" && data.results.length > 0) {
        const latitude = data.results[0].geometry.location.lat;
        setFormData((prev) => ({ ...prev, latitude })); // Update latitude in state
      } else {
        console.error("Geocoding API Error: ", data.status);
      }
    } catch (error) {
      console.error("Error fetching latitude: ", error);
    }
  };

  // Handle input change
  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });

  //   if (name === "address1") {
  //     fetchLatitude(value);
  //   }
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedFormData = { ...prev, [name]: value };

      // Fetch latitude when address1 changes
      if (name === "address1") {
        fetchLatitude(value); // Fetch latitude when address is typed
      }

      return updatedFormData;
    });
  };
  
  const validate = (values) => {
    const errors = {};
    const licenseRegex = /^[A-Z0-9]{10,16}$/i;
    const pincodeRegex = /^\d{6}$/;
    const mobileRegex = /^\+91[6-9]\d{9}$/;

    if (!values.address1) {
      errors.address1 = "Address 1 is required";
    }
    if (!values.address2) {
      errors.address2 = "Address 2 is required";
    }
    if (!values.address3) {
      errors.address3 = "Address 3 is required";
    }
    if (!values.country) {
      errors.country = "Please Select a Country";
    }
    if (!values.state) {
      errors.state = "Please Select a State";
    }
    if (!values.city) {
      errors.city = "Please Select a City";
    }
    if (!values.house) {
      errors.house = "House is required";
    }
    if (!values.vehicletype) {
      errors.vehicletype = "Please Select a Vehicle Type";
    }
    if (!values.monthyear) {
      errors.monthyear = "Please Select a Month and Year";
    }
    if (!values.drivinglicenseno) {
      errors.drivinglicenseno = "Driving License No. is required";
    } else if (!licenseRegex.test(values.drivinglicenseno)) {
      errors.drivinglicenseno =
        "Invalid format. Only 10-16 alphanumeric characters allowed.";
    }
    if (!values.drivinglicensephoto) {
      errors.drivinglicensephoto = "Driving License Photo is required";
    }
    if (!values.pincode) {
      errors.pincode = "Pincode is required";
    } else if (!pincodeRegex.test(values.pincode)) {
      errors.pincode = "Invalid Format. Only 6 Numeric Characters Allowed.";
    }
    if (!values.mobile) {
      errors.mobile = "Mobile Number is required";
    } else if (!mobileRegex.test(values.mobile)) {
      errors.mobile =
        "Invalid Mobile Number. Must start with +91 and be 10 digits.";
    }
    if (!values.home) {
      errors.home = "Home Number is required";
    } else if (!mobileRegex.test(values.home)) {
      errors.home =
        "Invalid Home Number. Must start with +91 and be 10 digits.";
    }

    return errors;
  };

  // Submit form data
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formData);
    setFormError(errors);
    if (Object.keys(errors).length === 0) {
      setSubmitted(true);
      try {
        axios
          .post("http://localhost:5000/Residental", formData)
          .then((response) => {
            console.log("Data submitted successfully:", response.data);
            alert("Residental data submitted successfully!");
          })
          .catch((error) => {
            console.error("Error submitting data:", error);
            alert("Failed to submit data. Please try again.");
          });
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to submit data. Please try again.");
      }
    } else {
      setSubmitted(false);
      console.log("Validation Errors:", errors);
    }
  };

  return (
    <>
      <Navbar />
      <Navbarsection />
      <div className="residental">
        <h1>Residental</h1>
        <h5>Corresponding Address:</h5>
        <form onSubmit={handleSubmit}>
          <div className="form-1">
            <div className="address-1">
              <label>Address 1</label>
              <input
                type="text"
                name="address1"
                placeholder="Enter Your Address"
                value={formData.address1}
                onChange={handleChange}
              />
              <p className="error">{formerror.address1}</p>
            </div>
            <div className="address-2">
              <label>Address 2</label>
              <input
                type="text"
                name="address2"
                placeholder="Enter Your Address"
                value={formData.address2}
                onChange={handleChange}
              />
              <p className="error">{formerror.address2}</p>
            </div>
          </div>
          <div className="form-2">
            <div className="address-3">
              <label>Address 3</label>
              <input
                type="text"
                name="address3"
                placeholder="Enter Your Address"
                value={formData.address3}
                onChange={handleChange}
              />
              <p className="error">{formerror.address3}</p>
            </div>
            <div className="country">
              <label>Country</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
              >
                <option value="">Select Country</option>
                <option value="India">India</option>
                <option value="Russia">Russia</option>
                <option value="Canada">Canada</option>
                <option value="China">China</option>
                <option value="United States">United States</option>
                <option value="Australia">Australia</option>
                <option value="Mexico">Mexico</option>
                <option value="Greenland">Greenland</option>
                <option value="Indonesia">Indonesia</option>
              </select>
              <p className="error">{formerror.country}</p>
            </div>
            <div className="state">
              <label>State</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
              >
                <option value="">Select State</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="West Bengal">West Bengal</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Telangana">Telangana</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
              </select>
              <p className="error">{formerror.state}</p>
            </div>
            <div className="city">
              <label>City</label>
              <select name="city" value={formData.city} onChange={handleChange}>
                <option value="">Select City</option>
                <option value="Rajkot">Rajkot</option>
                <option value="Surat">Surat</option>
                <option value="Bhavnagar">Bhavnagar</option>
                <option value="Jamnagar">Jamnagar</option>
                <option value="Vadodara">Vadodara</option>
                <option value="Ahmedabad">Ahmedabad</option>
                <option value="Junagadh">Junagadh</option>
                <option value="Anand">Anand</option>
                <option value="Gandhinagar">Gandhinagar</option>
                <option value="Mehsana">Mehsana</option>
              </select>
              <p className="error">{formerror.city}</p>
            </div>
          </div>

          <div className="form-3">
            <div className="house">
              <div className="house-1">
                <input
                  type="radio"
                  name="house"
                  onChange={handleChange}
                  value="Own House"
                  checked={formData.house == "Own House"}
                />
                <label>Own House</label>
                <input
                  type="radio"
                  name="house"
                  onChange={handleChange}
                  value="Rented House"
                  checked={formData.house == "Rented House"}
                />
                <label>Rented House</label>
              </div>
              <p className="error">{formerror.house}</p>
            </div>
            <div className="vehicletype">
              <label>Vehicle Type</label>
              <select
                name="vehicletype"
                onChange={handleChange}
                value={formData.vehicletype}
              >
                <option value="">Select Vehicle Type</option>
                <option value="Car">Car</option>
                <option value="Bike">Bike</option>
                <option value="Truck">Truck</option>
                <option value="Motorcycle">Motorcycle</option>
              </select>
              <p className="error">{formerror.vehicletype}</p>
            </div>
            <div className="residing-month-year">
              <label>Current residing month year</label>
              <input
                type="month"
                name="monthyear"
                onChange={handleChange}
                value={formData.monthyear}
              />
              <p className="error">{formerror.monthyear}</p>
            </div>
            <div className="drivinglicenseno">
              <label>Driving License No.</label>
              <input
                type="text"
                name="drivinglicenseno"
                onChange={handleChange}
                value={formData.drivinglicenseno}
              />
              <p className="error">{formerror.drivinglicenseno}</p>
            </div>
          </div>

          <div className="form-4">
            <div className="drivinglicensephoto">
              <label>Driving License Photo</label>
              <input
                type="file"
                name="drivinglicensephoto"
                onChange={handleChange}
                value={formData.drivinglicensephoto}
              />
              <p className="error">{formerror.drivinglicensephoto}</p>
            </div>
          </div>

          <div className="form-5">
            <div className="latitude">
              <label>Latitude</label>
              <input
                type="text"
                name="latitude"
                value={formData.latitude || ""}
                readOnly
              />
            </div>
            {/* <div className="longitude">
              <label>Longitude</label>
              <input type="text" name="longitude" />
            </div> */}
            {/* <div className="distancemeter">
              <label>Distance in Meter</label>
              <input type="text" name="distancemeter" />
            </div> */}
            {/* <div className="goggleaddress">
              <label>Google Map Address</label>
              <input type="text" name="goggleaddress" />
            </div> */}
          </div>

          <div className="form-6">
            <div className="pincode">
              <label>Pincode</label>
              <input
                type="number"
                name="pincode"
                onChange={handleChange}
                value={formData.pincode}
              />
              <p className="error">{formerror.pincode}</p>
            </div>
            <div className="mobile">
              <label>Mobile</label>
              <input
                type="text"
                name="mobile"
                onChange={handleChange}
                value={formData.mobile}
              />
              <p className="error">{formerror.mobile}</p>
            </div>
            <div className="home">
              <label>Home/CE</label>
              <input
                type="text"
                name="home"
                onChange={handleChange}
                value={formData.home}
              />
              <p className="error">{formerror.home}</p>
            </div>
          </div>

          <h5>Permanent Address:</h5>
          <div className="form-7">
            <div className="address-1">
              <label>Address 1</label>
              <input
                type="text"
                name="address1"
                placeholder="Enter Your Address"
                value={formData.address1}
                onChange={handleChange}
              />
              <p className="error">{formerror.address1}</p>
            </div>
            <div className="address-2">
              <label>Address 2</label>
              <input
                type="text"
                name="address2"
                placeholder="Enter Your Address"
                value={formData.address2}
                onChange={handleChange}
              />
              <p className="error">{formerror.address2}</p>
            </div>
          </div>

          <div className="form-8">
            <div className="address-3">
              <labe>Address 3</labe>
              <input
                type="text"
                name="address3"
                placeholder="Enter Your Address"
                value={formData.address3}
                onChange={handleChange}
              />
              <p className="error">{formerror.address3}</p>
            </div>
            <div className="country">
              <label>Country</label>
              <select
                name="country"
                onChange={handleChange}
                value={formData.country}
              >
                <option value="">Select Country</option>
                <option value="India">India</option>
                <option value="Russia">Russia</option>
                <option value="Canada">Canada</option>
                <option value="China">China</option>
                <option value="United States">United States</option>
                <option value="Australia">Australia</option>
                <option value="Mexico">Mexico</option>
                <option value="Greenland">Greenland</option>
                <option value="Indonesia">Indonesia</option>
              </select>
              <p className="error">{formerror.country}</p>
            </div>
            <div className="state">
              <label>State</label>
              <select
                name="state"
                onChange={handleChange}
                value={formData.state}
              >
                <option value="">Select State</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="West Bengal">West Bengal</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Telangana">Telangana</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
              </select>
              <p className="error">{formerror.state}</p>
            </div>
            <div className="city">
              <label>City</label>
              <select name="city" onChange={handleChange} value={formData.city}>
                <option value="">Select City</option>
                <option value="Rajkot">Rajkot</option>
                <option value="Surat">Surat</option>
                <option value="Bhavnagar">Bhavnagar</option>
                <option value="Jamnagar">Jamnagar</option>
                <option value="Vadodara">Vadodara</option>
                <option value="Ahmedabad">Ahmedabad</option>
                <option value="Junagadh">Junagadh</option>
                <option value="Anand">Anand</option>
                <option value="Gandhinagar">Gandhinagar</option>
                <option value="Mehsana">Mehsana</option>
              </select>
              <p className="error">{formerror.city}</p>
            </div>
          </div>

          <div className="form-9">
            <div className="pincode">
              <label>Pincode</label>
              <input
                type="number"
                name="pincode"
                onChange={handleChange}
                value={formData.pincode}
              />
              <p className="error">{formerror.pincode}</p>
            </div>
            <div className="mobile">
              <label>Mobile</label>
              <input
                type="text"
                name="mobile"
                onChange={handleChange}
                value={formData.mobile}
              />
              <p className="error">{formerror.mobile}</p>
            </div>
            <div className="home">
              <label>Home/CE</label>
              <input
                type="text"
                name="home"
                onChange={handleChange}
                value={formData.home}
              />
              <p className="error">{formerror.home}</p>
            </div>
            {/* <div className="house">
              <div className="house-1">
                <input
                  type="radio"
                  name="house"
                  onChange={handleChange}
                  value="Own House"
                  checked={formData.house == "Own House"}
                />
                <label>Own House</label>
                <input
                  type="radio"
                  name="house"
                  onChange={handleChange}
                  value="Rented House"
                  checked={formData.house == "Rented House"}
                />
                <label>Rented House</label>
              </div>
            </div> */}
          </div>

          <button type="submit" className="register-btn">
            Register Residental
          </button>
        </form>
      </div>
    </>
  );
};

export default Residental;
