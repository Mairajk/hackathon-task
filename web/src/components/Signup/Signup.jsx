import React, { useContext, useState } from "react";
import {
  Link,
  //  useNavigate
} from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

import "./Signup.css";
import { GlobalContext } from "../../context/context";

import Email_icon from "../assets/icons/Email-icon.png";
import Password_icon from "../assets/icons/Password-icon.png";
import phone_icon from "../assets/icons/phone-icon.png";
import UserName_icon from "../assets/icons/User-name-icon.png";

const Signup = () => {
  let { state, dispatch } = useContext(GlobalContext);
  // const [message, setMessage] = useState("");

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

        <form className="signup-form" onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="fullName">
              <input
                name="fullName"
                onChange={formik.handleChange}
                type="text"
                placeholder="Full Name"
              />
              <img src={UserName_icon} alt="" />
            </label>
            {formik.touched.fullName && Boolean(formik.errors.fullName) ? (
              <p className="inputError">{formik.errors.fullName}</p>
            ) : (
              <p className="inputError"></p>
            )}
          </div>

          <div>
            <label htmlFor="phoneNumber">
              <input
                name="phoneNumber"
                onChange={formik.handleChange}
                type="tel"
                placeholder="Contact"
              />
              <img src={phone_icon} alt="" />
            </label>
            {formik.touched.phoneNumber &&
            Boolean(formik.errors.phoneNumber) ? (
              <p className="inputError">{formik.errors.phoneNumber}</p>
            ) : (
              <p className="inputError"></p>
            )}
          </div>

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
