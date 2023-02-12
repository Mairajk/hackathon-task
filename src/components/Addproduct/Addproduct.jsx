import React, { useState, useEffect } from "react";
import { storage, auth, db } from "../../firebaseConfigs/firebaseConfigs";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Addproduct.css";

const Addproduct = () => {
    const [productTitle, setProductTitle] = useState("");
    const [productType, setProductType] = useState("");
    const [keyspecs, setKeyspecs] = useState("");
    const [description, setDescription] = useState("");
    const [brand, setBrand] = useState("");
    const [customersupport, setCustomersupport] = useState("");
    const [price, setPrice] = useState("");
    const [warranty, setWarranty] = useState("");
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

    const handleAddProduct = (e) => {
        e.preventDefault();
        const storageRef = ref(
            storage,
            `product-images${productType.toUpperCase()}/${Date.now()}`
        );
        // console.log(storageRef._location.path);
        uploadBytes(storageRef, productimage).then(() => {
            getDownloadURL(storageRef).then((url) => {
                addDoc(collection(db, `products-${productType.toUpperCase()}`), {
                    productTitle,
                    productType,
                    description,
                    brand,
                    customersupport,
                    price,
                    warranty,
                    productimage: url,
                    keyspecs: keyspecs
                });
            });
        });
    };

    return (
        <div>
            <Navbar />
            {loggeduser && (loggeduser[0].email === "muhammadsaad@gmail.com" || loggeduser[0].email === "saad@gmail.com") ? (
                <div className="Addprod-container">
                    <form className="addprod-form" onSubmit={handleAddProduct}>
                        <p>Add Data</p>
                        {successMsg && <div className="success-msg">{successMsg}</div>}
                        {uploadError && <div className="error-msg">{uploadError}</div>}

                        <label>Product Title</label>
                        <input
                            type="text"
                            onChange={(e) => {
                                setProductTitle(e.target.value);
                            }}
                            placeholder="Product Title"
                        />

                        <label>Product Type</label>
                        <input
                            type="text"
                            onChange={(e) => {
                                setProductType(e.target.value);
                            }}
                            placeholder="Product Type"
                        />

                        <label>Brand Name</label>
                        <input
                            type="text"
                            onChange={(e) => {
                                setBrand(e.target.value);
                            }}
                            placeholder="Brand Name"
                        />

                        <label>Warranty</label>
                        <input
                            type="text"
                            onChange={(e) => {
                                setWarranty(e.target.value);
                            }}
                            placeholder="Product Warranty"
                        />

                        <label>Image</label>
                        <input type="file" onChange={handleProductImg} />
                        {imageError && (
                            <>
                                <div className="error-msg">{imageError}</div>
                            </>
                        )}

                        <label>Key Specications</label>
                        <textarea
                            type="text"
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                            placeholder="Enter Some Specifications"
                        ></textarea>

                        <label>Description</label>
                        <textarea
                            type="text"
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                            placeholder="Product Description"
                        ></textarea>

                        <label>Price</label>
                        <input
                            type="text"
                            onChange={(e) => {
                                setPrice(e.target.value);
                            }}
                            placeholder="Product Price"
                        />

                        <label>Customer Support</label>
                        <input
                            type="text"
                            onChange={(e) => {
                                setCustomersupport(e.target.value);
                            }}
                            placeholder="Customer Support Email,Phone or Address"
                        />

                        <button type="submit">Add</button>
                    </form>
                </div>
            ) : (
                <div>
                    You Dont have access to add product Please contact with Admin for
                    Access
                </div>
            )}
        </div>
    );
};

export default Addproduct;
