import React, { useState, useEffect } from "react";
import { auth, db } from '../../firebaseConfigs/firebaseConfigs'
import { collection, getDocs, query, where } from "firebase/firestore";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import './UserProfile.css'

const UserProfile = () => {
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
  if (loggeduser) { console.log(loggeduser[0].email) }

  return (
    <div>
      <Navbar />
      <div className='userprofile-outercontainer'>
        {loggeduser ?
          <div className="user-profile">
            <p className="heading">Your Account Details</p>
            <div className="data-row">
              <span>Your Name</span>
              <span>{loggeduser[0].username}</span>
            </div>
            <div className="data-row">
              <span>Your Email</span>
              <span>{loggeduser[0].email}</span>
            </div>
            <div className="data-row">
              <span>Your Mobile Number</span>
              <span>{loggeduser[0].phonenumber}</span>
            </div>
            <div className="data-row">
              <span>Your Address</span>
              <span>{loggeduser[0].address}</span>
            </div>
          </div> :
          <div>
            <h6>Your are not login Please login
              <Link to='/login'>Sign In</Link>
            </h6>
          </div>}


      </div>
    </div>
  );
}

export default UserProfile