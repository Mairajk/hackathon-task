import React, { useState } from "react";
import { Link } from "react-router-dom";
import orderIcon from "../../../components/assets/icons/order-list.png";
import backArrow from "../../../components/assets/icons/backArrow.png";
import dpAvatar from "../../../components/assets/icons/dpAvatar.png";
import cameraIcon from "../../../components/assets/icons/cameraIcon.png";
import "./addItem.css";
const AddItem = () => {
  const [itemName, setItemName] = useState("");

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
              />
              <img src={cameraIcon} alt="" />
            </label>
          </div>

          <input type="text" className="itemname" />
        </form>
      </div>
    </div>
  );
};

export default AddItem;
