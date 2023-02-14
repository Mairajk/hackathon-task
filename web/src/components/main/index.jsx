/*------------------ Libraries -----------------*/

import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

/*------------------- Context Store ------------------*/

import { GlobalContext } from "../../context/context";

/* ---------------- Pages ----------------------*/

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

/* ======================================================================================================== */

const Main = () => {
  let { state, dispatch } = useContext(GlobalContext);

  console.log("state =============>", state);

  return (
    <div>
      <h1>This is Main</h1>
      <Routes>
        {state.isAdmin ? (
          <>
            <Route path="/" element={<AdminHome />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/addItems" element={<AddItems />} />
            <Route path="/account" element={<AdminAccount />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/account" element={<Account />} />
          </>
        )}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to={`/`} replace={true} />} />
      </Routes>
    </div>
  );
};

export default Main;
