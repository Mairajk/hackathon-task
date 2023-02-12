import React, { useContext, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

import { GlobalContext } from "../../context/context";

import Email_icon from "../assets/icons/Email-icon.png";
import Password_icon from "../assets/icons/Password-icon.png";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const { state, dispatch } = useContext(GlobalContext);

  const handleLogin = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="login-container">
        <header>
          <h1 className="mainHead">SAYLANI WELFARE</h1>
          <h3 className="subHead">ONLINE DISCOUNT STORE</h3>
        </header>

        <form className="login-form" onSubmit={handleLogin}>
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
