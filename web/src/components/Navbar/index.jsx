import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaHome } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { MdAddCircleOutline } from "react-icons/md";

import "./Navbar.css";
//  import { GlobalContext } from "../../../context/context";

const Navbar = (props) => {
  return (
    <div>
      {!props.isLogin ? (
        !props.isAdmin ? (
          <nav>
            <ul>
              <li className="navItems adminHomeNav " id="navItem">
                <Link to="/admin/">
                  <FaHome />
                  <p> Home</p>
                </Link>
              </li>

              <li className="navItems addItemsNav ">
                <Link to="/admin/addItems">
                  <MdAddCircleOutline />
                  <p> Add Items </p>
                </Link>
              </li>

              <li className="navItems adminAccountNav ">
                <Link to="/admin/account">
                  <BsFillPersonFill />
                  <p> Account</p>
                </Link>
              </li>
            </ul>
          </nav>
        ) : (
          <nav>
            <ul>
              <li className="navItems adminAccountNav ">
                <Link to="/">
                  <FaHome />
                  <p> Home</p>
                </Link>
              </li>

              <li className="navItems cartNav ">
                <Link to="/cart">
                  <FaShoppingCart />
                  <p>Cart</p>
                </Link>
              </li>

              <li className="navItems accountNav ">
                <Link to="/account">
                  <BsFillPersonFill />
                  <p>Account</p>
                </Link>
              </li>
            </ul>
          </nav>
        )
      ) : null}
    </div>
  );
};

export default Navbar;
