import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../../context/context";
import axios from "axios";
import Signup from "../Signup/Signup";
import Login from "../Login/Login";
import { Routes, Route, Link, Navigate } from "react-router-dom";

import Home from "../Home/Home";
import Addcategory from "../Admin-portal/Addcategory/Addcategory";
import AddItem from "../Admin-portal/addItem/addItem";

///================ Styling ===================================

////=====================================================

const Main = () => {
  let { state, dispatch } = useContext(GlobalContext);

  useEffect(() => {
    const getProfile = async () => {
      try {
        let res = await axios.get(
          `${state.baseURL}/profile`,
          // {},
          {
            withCredentials: true,
          }
        );

        console.log("useEffect ===>: ", res);

        dispatch({
          type: "USER_LOGIN",
        });
        dispatch({
          type: "SET_ADMIN",
          payload: res.data.isAdmin,
        });
        dispatch({
          type: "SET_USER",
          payload: res.data.userProfile,
        });
      } catch (error) {
        console.log("axios error: ", error);

        // dispatch({
        //     type: 'USER_LOGOUT'
        // })
      }
    };
    getProfile();
  }, []);

  return (
    <div>
      {state?.isLogin ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Addcategory" element={<Addcategory />} />
          <Route path="/AddItem" element={<AddItem />} />
          <Route path="*" element={<Navigate to={`/`} replace={true} />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to={`/`} replace={true} />} />
        </Routes>
      )}
    </div>
  );
};

export default Main;
