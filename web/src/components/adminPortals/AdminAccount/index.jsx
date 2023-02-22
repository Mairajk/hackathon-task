import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

import { GlobalContext } from "../../../context/context";
import backArrow from "../../../components/assets/icons/backArrow.png";
import dpAvatarLarge from "../../../components/assets/icons/dpAvatarLarge.png";
import { Link } from "react-router-dom";
import AddCategory from "../AddCategory/index";
import "./adminAccount.css";

const AdminAccount = () => {
  let { state, dispatch } = useContext(GlobalContext);
  const [message, setMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      fullName: "",
    },

    validationSchema: yup.object({
      fullName: yup
        .string("Enter your name")
        .required("User name is required")
        .min(3, "please enter atleast 3 characters ")
        .max(20, "please enter within 20 characters "),
    }),

    onSubmit: (values) => {
      const signupHandler = () => {
        axios
          .post(
            `${state.baseURL}/signup`,
            {
              fullName: values.fullName,
            },
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            console.log("response ===>", res);
            console.log("Signup successfull");

            // dispatch({
            //   type: "SET_USER",
            //   payload: res.data.userProfile,
            // });
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
    <div className="adminAccount">
      <div className="sec1">
        <header>
          <Link to="/">
            <img className="backArrow-account" src={backArrow} alt="" />
          </Link>
          <h2>Settings</h2>
        </header>
        <img src={dpAvatarLarge} alt="" />

        <form
          action=""
          className="updateNameForm"
          onSubmit={formik.handleSubmit}
        >
          <div className="inputDiv">
            <input
              type="text"
              className="editName"
              placeholder="Update Full Name"
              onChange={formik.handleChange}
            />
            <p className="inputError">
              {formik.touched.password && Boolean(formik.errors.password)
                ? formik.errors.password
                : null}
            </p>
          </div>
        </form>
      </div>

      <AddCategory />

      <div className="categoriesList"></div>
    </div>
  );
};

export default AdminAccount;
