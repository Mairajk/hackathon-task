import React, { useContext, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";

import { GlobalContext } from "../../context/context";

import Email_icon from "../assets/icons/Email-icon.png";
import Password_icon from "../assets/icons/Password-icon.png";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const { state, dispatch } = useContext(GlobalContext);

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
            `${state.baseURL}/signup`,
            {
              fullName: values.fullName,
              phoneNumber: values.phoneNumber,
              email: values.email,
              password: values.password,
            },
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            console.log("response ===>", res);
            console.log("Signup successfull");
            // setIsSignup(false);
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
            // setMessage(err?.response?.data?.message);
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

        <form className="login-form">
          <div>
            <label htmlFor="email">
              <input
                name="email"
                onChange={formik.handleChange}
                type="email"
                placeholder="Email"
              />
              <img src={Email_icon} alt="" />
            </label>
            {formik.touched.email && Boolean(formik.errors.email) ? (
              <p className="inputError">{formik.errors.email}</p>
            ) : (
              <p className="inputError"></p>
            )}
          </div>

          <div>
            <label htmlFor="password">
              <input
                name="password"
                onChange={formik.handleChange}
                type="password"
                placeholder="Password"
              />
              <img src={Password_icon} alt="" />
            </label>
            {formik.touched.password && Boolean(formik.errors.password) ? (
              <p className="inputError">{formik.errors.password}</p>
            ) : (
              <p className="inputError"></p>
            )}
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
