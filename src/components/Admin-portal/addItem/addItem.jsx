import React, { useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import orderIcon from "../../../components/assets/icons/order-list.png";
import backArrow from "../../../components/assets/icons/backArrow.png";
import dpAvatar from "../../../components/assets/icons/dpAvatar.png";
import cameraIcon from "../../../components/assets/icons/cameraIcon.png";
import "./addItem.css";
const AddItem = () => {
  const [itemName, setItemName] = useState("");
  const [itemPhoto, setItemPhoto] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [unitName, setUnitName] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [data, setData] = useState([]);

  return (
    <div className="addItem">
      <header>
        <div className="userDetail">
          <div className="backArrow">
            <img src={backArrow} alt="" />
          </div>

          <div className="profilePhoto">
            <img src={dpAvatar} alt="" />
          </div>

          <div>
            <p className="userName">{"Mr.Shehzad"}</p>
            <p className="role">{"Role"}</p>
          </div>
        </div>

        <div className="orders">
          <Link to="/">
            <img src={orderIcon} alt="" />
          </Link>
        </div>
      </header>

      <div className="sep"></div>

      <div className="addItem">
        <h3>Add New Item</h3>

        <form action="" className="itemForm">
          <div className="imageInput">
            <label for="itemPhoto" className="itemPhoto">
              <input
                type="file"
                id="itemPhoto"
                className="none"
                style={{ display: "none" }}
                onChange={(e) => {
                  setItemPhoto(e.target.value);
                }}
              />
              <img src={cameraIcon} alt="" />
            </label>
          </div>

          <input
            type="text"
            className="itemName"
            required
            placeholder="Item Name"
            onChange={(e) => {
              setItemName(e.target.value);
            }}
          />

          <select
            required
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option value={null}>Select Category</option>
          </select>

          <div className="unitsDiv">
            <label htmlFor="unitName">Unit Name:</label>
            <input
              type="text"
              name="unitName"
              placeholder="Pcs. / Kg / Dozen"
              onChange={(e) => {
                setUnitName(e.target.value);
              }}
            />
          </div>

          <div className="unitsDiv">
            <label htmlFor="unitPrice">Unit Name:</label>
            <input
              type="text"
              name="unitPrice"
              placeholder="$3.22"
              onChange={(e) => {
                setUnitPrice(e.target.value);
              }}
            />
          </div>

          <button type="submit" className="addProBtn">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
