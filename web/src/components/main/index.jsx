/*------------------ Libraries -----------------*/

import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

/*------------------- Context Store ------------------*/

import { GlobalContext } from "../../context/context";

/* ---------------- Pages ----------------------*/

import "./main.css";

/* Auth Pages */
import Login from "../authPages/Login";
import Signup from "../authPages/Signup";

/* Admin Pages */
import AdminHome from "../adminPortals/AdminHome";
import AddItems from "../adminPortals/AddItems";
import AdminAccount from "../adminPortals/AdminAccount";
import Orders from "../adminPortals/Orders";

/* User Pages */
import Home from "../userPortals/Home";
import Cart from "../userPortals/Cart";
import Account from "../userPortals/Account";
import Navbar from "../Navbar";

/* ======================================================================================================== */

const Main = () => {
  let { state, dispatch } = useContext(GlobalContext);

  console.log("state =============>", state);

  return (
    <div>
      <Navbar state />
      <Routes>
        {!state.isAdmin ? (
          <>
            <Route path="/admin/" element={<AdminHome />} />
            <Route path="/admin/orders" element={<Orders />} />
            <Route path="/admin/addItems" element={<AddItems />} />
            <Route path="/admin/account" element={<AdminAccount />} />
            <Route
              path="*"
              element={<Navigate to={`/admin/`} replace={true} />}
            />
          </>
        ) : !state.isLogin ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/account" element={<Account />} />
            <Route path="*" element={<Navigate to={`/`} replace={true} />} />
          </>
        ) : (
          <>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="*"
              element={<Navigate to={`/login`} replace={true} />}
            />
          </>
        )}
      </Routes>
    </div>
  );
};

export default Main;
