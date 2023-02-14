import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

import "./Signup.css";
import { GlobalContext } from "../../../context/context";

import Email_icon from "../../assets/icons/Email-icon.png";
import Password_icon from "../../assets/icons/Password-icon.png";
import phone_icon from "../../assets/icons/phone-icon.png";
import UserName_icon from "../../assets/icons/User-name-icon.png";

const Signup = () => {
  let { state, dispatch } = useContext(GlobalContext);
  const [message, setMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      contact: "",
      fullName: "",
    },

    validationSchema: yup.object({
      fullName: yup
        .string("Enter your name")
        .required("User name is required")
        .min(3, "please enter atleast 3 characters ")
        .max(20, "please enter within 20 characters "),

      phoneNumber: yup
        .string("Enter your contact number")
        .required("last name is required")
        .min(3, "please enter atleast 3 characters ")
        .max(20, "please enter within 20 characters "),

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
      const signupHandler = () => {
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

      signupHandler();
    },
  });

  return (
    <div>
      <div className="signup-container">
        <header>
          <h1 className="mainHead">SAYLANI WELFARE</h1>
          <h3 className="subHead">ONLINE DISCOUNT STORE</h3>
        </header>

        <p className="resMessage">{message}</p>

        <form className="signup-form" onSubmit={formik.handleSubmit}>
          <div className="inputDiv">
            <div>
              <input
                name="fullName"
                onChange={formik.handleChange}
                type="text"
                placeholder="Full Name"
              />
              <label htmlFor="fullName">
                <img src={UserName_icon} alt="" />
              </label>
            </div>
            <p className="inputError">
              {formik.touched.password && Boolean(formik.errors.password)
                ? formik.errors.password
                : null}
            </p>
          </div>

          <div className="inputDiv">
            <div>
              <input
                name="phoneNumber"
                onChange={formik.handleChange}
                type="tel"
                placeholder="Contact"
              />
              <label htmlFor="phoneNumber">
                <img src={phone_icon} alt="" />
              </label>
            </div>
            <p className="inputError">
              {formik.touched.password && Boolean(formik.errors.password)
                ? formik.errors.password
                : null}
            </p>
          </div>

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
