import React, { useState } from "react";
import cameraIcon from "../../../components/assets/icons/cameraIcon.png";
import Header from '../Header'
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
      <Header/>
      <div className="addItem">
        <h3>Add New Item</h3>

        <form action="" className="itemForm">
          <div className="imageInput">
            <label htmlFor="itemPhoto" className="itemPhoto">
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
