import { useState } from "react";

import { FaSync, FaCheck } from "react-icons/fa";

const OrderList = (props) => {
  const {
    data,
    data2,
    isStable,
    setIsStable,
    isAdmin,
    check,
    setCheck,
    status,
    setStatus,
    syncChanges,
  } = props;

  const checkOut = () => {
    if (check) {
      setTimeout(() => {
        setCheck(false);
      }, 10000);
    }
  };

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
          </div>
          <div className="total">
            <p className="label">Total</p>
            <p className="amount">187</p>
          </div>

          {!isAdmin ? (
            <form action="" className="orderStatusForm" onSubmit={syncChanges}>
              <select
                name="status"
                className=""
                onChange={(e) => {
                  setStatus(e.target.value);
                  setIsStable(!e.target.value);
                  console.log("stable ====== =>", isStable);
                  console.log("status ====== =>", status);
                  e.target.attributes.class.value = e.target.value
                    ? "selected"
                    : null;
                  console.log(
                    "class =======>",
                    e.target.attributes.class.value
                  );
                }}
              >
                <option value="" className="defaultSelect" selected disabled>
                  Change status
                </option>
                <option value="pending">pending</option>
                <option value="active">active</option>
                <option value="complete">complete</option>
              </select>
              {isStable && check ? (
                <i className="check">
                  <FaCheck />;
                </i>
              ) : (
                <button
                  type="submit"
                  className={!isStable && status ? "unstable" : "stable"}
                  onClick={checkOut}
                >
                  <FaSync />
                </button>
              )}
            </form>
          ) : null}

          <div className="sep"></div>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
