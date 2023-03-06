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
  const [isStable, setIsStable] = useState(true);
  const [check, setCheck] = useState(false);
  const [status, setStatus] = useState(null);

  const syncChanges = (e) => {
    e.preventDefault();
    console.log("event ===============================>", e);
    setCheck(true);
    setIsStable(true);
    e.target.value = "";
    // e
// 
    // setTimeout(() => {
    //   setCheck(false);
    // }, 3000);

    // axios
    //   .post(
    //     `${state.baseURL}/login`,
    //     {},
    //     {
    //       withCredentials: true,
    //     }
    //   )
    //   .then((res) => {
    //     console.log("response ===>", res);
    //     console.log("Login successfull");
    //   })
    //   .catch((err) => {
    //     console.log("error ===>", err);
    //     setMessage(err?.response?.data?.message);
    //   });
  };

  return (
    <div>
      <Header />

      <div className="orders">
        <h3>Orders</h3>

        <OrderList
          data={data}
          data2={data2}
          isAdmin={state.isAdmin}
          status={status}
          setStatus={setStatus}
          isStable={isStable}
          setIsStable={setIsStable}
          check={check}
          setCheck={setCheck}
          syncChanges={syncChanges}
        />
      </div>
    </div>
  );
};

export default Orders;
