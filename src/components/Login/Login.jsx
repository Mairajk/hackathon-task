import React, { useState } from "react";
import "./Login.css";
import Navbar from "../Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import Email_icon from "../assets/icons/Email-icon.png";
import Password_icon from "../assets/icons/Password-icon.png";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("==============>", userCredential);
        setSuccessMsg(
          "Logged in successfully, you will now be automatically redirected to Home page."
        );
        setPassword("");
        setEmail("");
        setErrorMsg("");

        setTimeout(() => {
          setSuccessMsg("");
          navigate("/home");
        }, 1000);
      })
      .catch((error) => {
        console.log(error.message);
        setErrorMsg(error.message);
      });
  };

  return (
    <div>
      <div className="login-container">
        <header>
          <h1 className="mainHead">SAYLANI WELFARE</h1>
          <h3 className="subHead">ONLINE DISCOUNT STORE</h3>
        </header>

        <form className="login-form" onSubmit={handleLogin}>
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

          <button type="submit">Login</button>

          <div>
            <Link to="/signup">
              <span>Don’t have an account? Register</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
