import { Link } from "react-router-dom";

import "./header.css";

import orderIcon from "../../../components/assets/icons/order-list.png";
import backArrow from "../../../components/assets/icons/backArrow.png";
import dpAvatar from "../../../components/assets/icons/dpAvatar.png";

const Header = () => {
  return (
    <div>
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

        <div className="ordersIcon">
          <Link to="/admin/orders">
            <img src={orderIcon} alt="" />
          </Link>
        </div>
      </header>

      <div className="sep"></div>
    </div>
  );
};

export default Header;
