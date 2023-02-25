import React, { useState } from "react";
import Header from "../Header";
import Apple from "../../assets/dummyImages/apple.png";
import Mango from "../../assets/dummyImages/mango.png";
import Kivi from "../../assets/dummyImages/kivi.png";
import Watermelon from "../../assets/dummyImages/watermelon.png";

import "./AdminHome.css";

const AdminHome = () => {
  const [data, setData] = useState([
    Apple,
    Mango,
    Kivi,
    Watermelon,
    Apple,
    Mango,
    Kivi,
    Watermelon,
    "",
    "",
  ]);

  return (
    <div className="adminHome">
      <Header />

      <div className="allProducts">
        <h3>All Products</h3>

        {data.map((product, i) => (
          <div className="eachProduct" key={i}>
            <div className="productImage">
              <img src={product} alt="" />
            </div>

            <div className="details">
              <div className="name&unit">
                <p className="productName">Apple</p>
                <p className="productUnit">1. kg</p>
              </div>
              <p className="price">$21</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHome;
