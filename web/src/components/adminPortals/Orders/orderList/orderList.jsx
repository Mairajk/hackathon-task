import { useState } from "react";

import { FaSync, FaCheck } from "react-icons/fa";

const OrderList = (props) => {
  const { data, data2, isStable } = props;
  const [isSelect, setIsSelect] = useState(false);

  return (
    <div>
      {data.map((order, i) => (
        <div className="eachOrder" key={i}>
          <h4 className="customerName"> Ubaid Khan </h4>

          <div className="statusANDcontact">
            <p className="status">
              <span className="updatedAt"></span>
              <span className="statusName">Pending</span>
            </p>
            <p className="contact">03422098367</p>
          </div>

          <div className="items">
            {/* {order.items.map((eachItem , i) => ( */}
            {data2.map((eachItem, i) => (
              <div className="eachItem" key={i}>
                <span className="quantity"> 2 </span>
                <span className="quantity"> X </span>
                <span className="quantity"> ITEM NAME </span>
              </div>
            ))}

            {!props.isAdmin ? (
              <form action="" className="orderStatusForm">
                <select
                  name="status"
                  id="status"
                  className=""
                  onChange={(e) => {
                    console.log(
                      "========================>",
                      e.target.class
                    );

                    // e.target.attributes.class = "selected";
                  }}
                >
                  <option value="" className="defaultSelect" disabled selected>
                    Change status
                  </option>
                  *<option value="pending">pending</option>*
                  <option value="active">active</option>*
                  <option value="complete">complete</option>*
                </select>
                {!isStable ? (
                  <i className="check">
                    <FaCheck />
                  </i>
                ) : (
                  <button className={isStable ? "stable" : "unstable"}>
                    <FaSync />
                  </button>
                )}
              </form>
            ) : null}
          </div>

          <div className="sep"></div>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
