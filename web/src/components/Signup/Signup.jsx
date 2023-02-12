import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

import Email_icon from "../assets/icons/Email-icon.png";
import Password_icon from "../assets/icons/Password-icon.png";
import phone_icon from "../assets/icons/phone-icon.png";
import UserName_icon from "../assets/icons/User-name-icon.png";

const Signup = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="signup-container">
        <header>
          <h1 className="mainHead">SAYLANI WELFARE</h1>
          <h3 className="subHead">ONLINE DISCOUNT STORE</h3>
        </header>

        <form className="signup-form" onSubmit={handleSubmit}>
          <label htmlFor="fullName">
            <input
              name="fullName"
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              placeholder="Full Name"
            />
            <img src={UserName_icon} alt="" />
          </label>

          <label htmlFor="phoneNumber">
            <input
              name="phoneNumber"
              onChange={(e) => setPhonenumber(e.target.value)}
              type="tel"
              placeholder="Contact"
            />
            <img src={phone_icon} alt="" />
          </label>

          <label htmlFor="email">
            <input
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
            />
            <img src={Email_icon} alt="" />
          </label>

          <label htmlFor="password">
            <input
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
            <img src={Password_icon} alt="" />
          </label>

          <button type="submit">Sign up</button>

          <div>
            <Link to="/login">
              <span>Already have an Account? Login</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
