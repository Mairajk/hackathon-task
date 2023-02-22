import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

import { GlobalContext } from "../../../context/context";
import cameraIcon from "../../../components/assets/icons/cameraIcon.png";
import Header from "../Header";
import "./addItem.css";

const AddItems = () => {
  let { state, dispatch } = useContext(GlobalContext);
  const [message, setMessage] = useState("");
  const formik = useFormik({
    initialValues: {
      itemImage: null,
      itemName: "",
      category: "",
      unitName: "",
      unitPrice: "",
    },

    validationSchema: yup.object({
      itemName: yup
        .string("Enter item name")
        .required("Item name is required")
        .min(3, "please enter atleast 3 characters ")
        .max(20, "please enter within 20 characters "),

      category: yup
        .string("Select a category for this item")
        .oneOf(["fruits", "vegetable", "meat"])
        .defined(),

      unitName: yup
        .string("Enter unit name for product")
        .required("Unit name is required")
        .min(2, "please enter more then 2 characters ")
        .max(15, "please enter within 15 characters "),

      unitPrice: yup
        .string("Enter price of product ")
        .required("Unit price is required")
        .max(10, "Maximum 10 characters"),

      itemImage: yup,
      // .mixed()
      // .required("A file is required")
      // .test(
      //   "fileSize",
      //   "File too large",
      //   (value) => value && value.size <= 10
      // )
      // .test(
      //   "fileFormat",
      //   "Unsupported Format",
      //   (value) => value && ["png", "jpg", "jpeg"].includes(value.type)
      // ),
    }),

    onSubmit: (values) => {
      const signupHandler = () => {
        axios
          .post(
            `${state.baseURL}/addItem`,
            {
              itemName: values.itemName,
              category: values.category,
              unitName: values.unitName,
              unitPrice: values.unitPrice,
              itemImage: values.itemImage,
            },
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            console.log("response ===>", res);
            console.log("addItems successfull");
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
    <div className="addItem">
      <Header />

      <div className="addItem">
        <h3>Add New Item</h3>

        <form action="" className="itemForm" onSubmit={formik.handleSubmit}>
          <div className="inputDiv">
            <div className="imageInput">
              <label htmlFor="itemPhoto" className="itemPhoto">
                <input
                  type="file"
                  id="itemPhoto"
                  className="none"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    formik.setFieldValue("itemImage", e.currentTarget.files[0]);
                  }}
                />
                <img src={cameraIcon} alt="" />
              </label>
            </div>
            <p className="inputError">
              {formik.touched.itemImage && Boolean(formik.errors.itemImage)
                ? formik.errors.itemImage
                : null}
            </p>
          </div>

          <input
            type="text"
            className="itemName"
            id="itemName"
            required
            placeholder="Item Name"
            onChange={formik.handleChange}
          />

          <select
            required
            onChange={(e) => {
              formik.setFieldValue("category", e.currentTarget.value);
            }}
          >
            <option value={null}>Select Category</option>
          </select>

          <div className="unitsDiv">
            <label htmlFor="unitName">Unit Name:</label>
            <input
              type="text"
              name="unitName"
              id="unitName"
              placeholder="Pcs. / Kg / Dozen"
              onChange={formik.handleChange}
            />
          </div>

          <div className="unitsDiv">
            <label htmlFor="unitPrice">Unit Name:</label>
            <input
              type="text"
              id="unitPrice"
              name="unitPrice"
              placeholder="$3.22"
              onChange={formik.handleChange}
            />
          </div>

          <button type="submit" className="addProBtn">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
