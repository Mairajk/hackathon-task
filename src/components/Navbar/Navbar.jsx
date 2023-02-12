import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import cart from "../assets/cart.png";
import usericon from "../assets/usericon.png";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from '../../firebaseConfigs/firebaseConfigs'
import logo from '../assets/logo.png'
import { Nav } from "react-bootstrap";



const Navbar = () => {
  function GetCurrentUser() {
    const [user, setUser] = useState(" ")
    const usersCollectionRef = collection(db, "users")

    useEffect(() => {
      auth.onAuthStateChanged(
        userlogged => {
          if (userlogged) {
            const getUsers = async () => {
              const q = query(collection(db, "users"), where("uid", "==", userlogged.uid))
              // console.log(q);
              const data = await getDocs(q);
              setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            }
            getUsers();
          }
          else {
            setUser(null);
          }
        })
    }, [])
    return user
  }
  const loggeduser = GetCurrentUser();

  const navigate = useNavigate()

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate("/login")
    })
  }

  return (
    <div>
      <div className="navbar">
        <div className="LeftContainer">
          <img src={logo} alt="app logo" />
        </div>
        <div className="RightContainer">
          {!loggeduser && <nav>
            <Link to="/">
              <button>Home</button>
            </Link>
            <Link to="/signup">
              <button>Register</button>
            </Link>
            <Link to="/login">
              <button>Login</button>
            </Link>


            <Link to="/cart">
              <div className="cart-btn">
                <img src={cart} alt="cart icon" />
                <span className="cart-icon-css">0</span>
              </div>
            </Link>

            <Link to="/userprofile">
              <img src={usericon} alt="user-icon" className="profile-icon" />
            </Link>

          </nav>}

          {loggeduser && <nav>

            <Link to="/">
              <button>Home</button>
            </Link>

            <Link to="/sellproduct">
              <button>Sell</button>
            </Link>

            <Link to="/cart">
              <div className="cart-btn">
                <img src={cart} alt="cart icon" />
                <span className="cart-icon-css">{loggeduser[0].cart}</span>
              </div>
            </Link>

            <Link to="/userprofile">
              <img src={usericon} alt="user-icon" className="profile-icon" />
            </Link>

            <button className="logout-btn" onClick={handleLogout}>Logout</button>

          </nav>}

        </div>
      </div>

      {/* <div className="product-types">
        <a href="/product-types/mobiles"><button>Mobiles</button></a>
        <a href="/product-types/laptops"><button>Laptops</button></a>
        <a href="/product-types/cameras"><button>Cameras</button></a>
        <a href="/product-types/shoes"><button>Shoes</button></a>
      </div> */}
    </div>
  );
};

export default Navbar;
