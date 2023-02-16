import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaHome } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";

import "./Navbar.css";
// import accountIcon from "../assets/icons/accountIcon.svg";
// import addIcon from "../assets/icons/addIcon.svg";
// import HomeIcon from "../assets/icons/homeIcon.svg";

//  import { GlobalContext } from "../../../context/context";

const Navbar = (props) => {
  const changeColor = (e) => {
    e.target.style.color = "#61B846";
    e.target.style.border = "2px";
  };

  return (
    <div>
      {!props.isLogin ? (
        props.isAdmin ? (
          <nav>
            <ul>
              <li className="adminHomeNav">
                <Link to="/">
                  <FaHome />
                  <p> Home</p>
                </Link>
              </li>
              <li className="addItemsNav">
                <Link to="/addItems">
                  <p> Add Items </p>
                </Link>
              </li>
              <li className="adminAccountNav">
                <Link to="/adminAccount">
                  <p> Account</p>
                </Link>
              </li>
            </ul>
          </nav>
        ) : (
          <nav>
            <ul>
              <li
                className="adminAccountNav"
                style={{
                  color: "#61B846",
                }}
              >
                <Link to="/">
                  <FaHome />
                  <p> Home</p>
                </Link>
              </li>
              <li className="cartNav">
                <Link to="/cart">
                  <FaShoppingCart />
                  <p>Cart</p>
                </Link>
              </li>
              <li className="accountNav">
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
