import React, { useContext, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";

import Header from "../Header";
import OrderList from "./orderList/orderList";
import "./orders.css";
import { GlobalContext } from "../../../context/context";

const Orders = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [message, setMessage] = useState("");
  const [data, setData] = useState(["", "", "", "", "", "", "", "", "", ""]);
  const [data2, setData2] = useState(["", "", "", ""]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: yup.object({
      email: yup.string("Enter your email"),
    }),

    onSubmit: (values) => {
      const statusChanger = () => {
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
          })
          .catch((err) => {
            console.log("error ===>", err);
            setMessage(err?.response?.data?.message);
          });
      };

      statusChanger();
    },
  });

  return (
    <div>
      <Header />

      <div className="orders">
        <h3>Orders</h3>

        <OrderList
          data={data}
          data2={data2}
          isAdmin={state.isAdmin}
          formik={formik}
        />
      </div>
    </div>
  );
};

export default Orders;
