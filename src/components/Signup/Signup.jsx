import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebaseConfigs/firebaseConfigs";
import { collection, addDoc } from "firebase/firestore";
import "./Signup.css";

import Email_icon from "../assets/icons/Email-icon.png";
import Password_icon from "../assets/icons/Password-icon.png";
import phone_icon from "../assets/icons/phone-icon.png";
import UserName_icon from "../assets/icons/User-name-icon.png";
// C:\clone repo batech 8\ecommerce\src\firebaseConfigs\firebaseConfigs.js
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth, db } from "../../firebaseConfigs/firebaseConfigs";
// import { collection, addDoc } from "firebase/firestore";

const Signup = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const initialcatvalue = 0;
        console.log(user);

        addDoc(collection(db, "users"), {
          username: username,
          email: email,
          phonenumber: phonenumber,
          password: password,
          cart: initialcatvalue,
          address: address,
          uid: user.uid,
          role: user,
        })
          .then(() => {
            setSuccessMsg(
              "New user added successfully, you will now be automatically redirected to home page."
            );
            setUserName("");
            setPassword("");
            setEmail("");
            setPassword("");
            setErrorMsg("");

            setTimeout(() => {
              setSuccessMsg("");
              navigate("/home");
            }, 1000);
          })
          .catch((error) => {
            setErrorMsg(error.message);
          });
      })
      .catch((error) => {
        console.log(error.message);
        setErrorMsg(error.message);
        // if (error.message === 'Firebase:Error (auth/invalid-email).') {
        //   setErrorMsg('Please fill all required fields')
        // }
        // if (error.message === 'Firebase:Error (auth/email-already-in-use).') {
        //   setErrorMsg('user already exists')
        // }
      });
    e.reset();
  };

  return (
    <div>
      <div className="signup-container">
        <header>
          <h1 className="mainHead">SAYLANI WELFARE</h1>
          <h3 className="subHead">ONLINE DISCOUNT STORE</h3>
        </header>

        <form className="signup-form" onSubmit={handleSubmit}>
          {successMsg && (
            <>
              <div className="success-msg">{successMsg}</div>
            </>
          )}
          {errorMsg && (
            <>
              <div className="error-msg">{errorMsg}</div>
            </>
          )}

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
