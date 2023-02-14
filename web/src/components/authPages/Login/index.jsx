import React, { useContext, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";

import "./Login.css";
import { GlobalContext } from "../../../context/context";
import Email_icon from "../../assets/icons/Email-icon.png";
import Password_icon from "../../assets/icons/Password-icon.png";

const Login = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [message, setMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: yup.object({
      email: yup
        .string("Enter your email")
        .required("Email is required")
        .email("Enter a valid Email ")
        .min(3, "please enter more then 3 characters ")
        .max(25, "please enter within 20 characters "),

      password: yup
        .string("Please enter your Password")
        .required("Password is required")
        .min(6, "Minimum 6 characters"),
    }),

    onSubmit: (values) => {
      const loginHandler = () => {
        axios
          .post(
            `${state.baseURL}/login`,
            {
              email: values.email,
              password: values.password,
            },
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            console.log("response ===>", res);
            console.log("Login successfull");

            dispatch({
              type: "USER_LOGIN",
              payload: null,
            });

            dispatch({
              type: "SET_USER",
              payload: res.data.userProfile,
            });
          })
          .catch((err) => {
            console.log("error ===>", err);
            setMessage(err?.response?.data?.message);
          });
      };

      loginHandler();
    },
  });

  return (
    <div>
      <div className="login-container">
        <header>
          <h1 className="mainHead">SAYLANI WELFARE</h1>
          <h3 className="subHead">ONLINE DISCOUNT STORE</h3>
        </header>

        <p className="resMessage">{message}</p>

        <form className="login-form" onSubmit={formik.handleSubmit}>
          <div className="inputDiv">
            <div>
              <input
                name="email"
                onChange={formik.handleChange}
                type="email"
                placeholder="Email"
              />
              <label htmlFor="email">
                <img src={Email_icon} alt="" />
              </label>
            </div>
            <p className="inputError">
              {formik.touched.email && Boolean(formik.errors.email)
                ? formik.errors.email
                : null}
            </p>
          </div>

          <div className="inputDiv">
            <div>
              <input
                name="password"
                onChange={formik.handleChange}
                type="password"
                placeholder="Password"
              />
              <label htmlFor="password">
                <img src={Password_icon} alt="" />
              </label>
            </div>
            <p className="inputError">
              {formik.touched.password && Boolean(formik.errors.password)
                ? formik.errors.password
                : null}
            </p>
          </div>
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
