import React, { useState, useEffect } from "react";
import { storage, auth, db } from "../../firebaseConfigs/firebaseConfigs";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Addcategory.css";

const Addcategory = () => {
  const [productCategory, setproductCategory] = useState("");
  const [keyspecs, setKeyspecs] = useState("");
  const [productimage, setProductimage] = useState("");

  const [imageError, setImageError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [uploadError, setUploadError] = useState("");

  function GetCurrentUser() {
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
  }

  const types = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/PNG",
    "image/webp",
  ];
  const handleProductImg = (e) => {
    e.preventDefault();
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && types.includes(selectedFile.type)) {
        setProductimage(selectedFile);
        setImageError("");
      } else {
        setProductimage(null);
        setImageError("Please select a valid image file type(png or jpg)");
      }
    } else {
      setImageError("Please select your file");
    }
  };
  const loggeduser = GetCurrentUser();

  //   if (loggeduser) { console.log(loggeduser[0].email) }

  const handleAddcategory = (e) => {
    e.preventDefault();
    const storageRef = ref(
      storage,
      `product-images${productCategory.toUpperCase()}/${Date.now()}`
    );
    // console.log(storageRef._location.path);
    uploadBytes(storageRef, productimage).then(() => {
      getDownloadURL(storageRef).then((url) => {
        addDoc(collection(db, `products-${productCategory.toUpperCase()}`), {
          productCategory,
          productimage: url,
          keyspecs: keyspecs,
        });
      });
    });
  };

  return (
    <div>
      {/* <Navbar /> */}
      {loggeduser &&
      (loggeduser[0].email === "muhammadsaad@gmail.com" ||
        loggeduser[0].email === "saad@gmail.com") ? (
        <div className="Addcategory-container">
          <form className="Addcategory-form" onSubmit={handleAddcategory}>
            <p>Add Data</p>
            {successMsg && <div className="success-msg">{successMsg}</div>}
            {uploadError && <div className="error-msg">{uploadError}</div>}

            <label>Image</label>
            <input type="file" onChange={handleProductImg} />
            {imageError && (
              <>
                <div className="error-msg">{imageError}</div>
              </>
            )}

            <label>Product Category</label>
            <input
              type="text"
              onChange={(e) => {
                setproductCategory(e.target.value);
              }}
              placeholder="Product Category"
            />

            <button type="submit">Add</button>
          </form>
        </div>
      ) : (
        <div>
         Loading..........
        </div>
      )}
    </div>
  );
};

export default Addcategory;
