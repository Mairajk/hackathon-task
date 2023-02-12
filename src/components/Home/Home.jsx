import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebaseConfigs/firebaseConfigs";
import { collection, getDocs, query, where } from "firebase/firestore";
import "./Home.css";
import AddItem from "../Admin-portal/addItem/addItem";

const Home = () => {
  const GetCurrentUser = () => {
    const [user, setUser] = useState(" ");
    const usersCollectionRef = collection(db, "users");

    useEffect(() => {
      auth.onAuthStateChanged((userlogged) => {
        if (userlogged) {
          const getUsers = async () => {
            const q = query(
              collection(db, "users"),
              where("uid", "==", userlogged.uid)
            );
            // console.log(q);
            const data = await getDocs(q);
            setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          };
          getUsers();
        } else {
          setUser(null);
        }
      });
    }, []);
    return user;
  };
  const loggeduser = GetCurrentUser();

  return (
    <div>
      <AddItem />
    </div>
  );
};

export default Home;
