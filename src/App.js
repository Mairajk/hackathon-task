import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Cart from "./components/Cart/Cart";
import PgFof from "./components/PgFof/PgFof";
import UserProfile from "./components/UserProfile/UserProfile";
import Addproduct from "./components/Addproduct/Addproduct";
import Allproductpage from "./components/Some-Product-Components/Allprodustpage/Allproductpage";
import SpecificProductpage from "./components/Some-Product-Components/SpecificProductpage/SpecificProductpage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/login/signup" element={<Signup />} /> */}
        <Route path="/login" element={<Login />} />
        {/* <Route path="/signup/login" element={<Login />} /> */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/sellproduct" element={<Addproduct />} />
        <Route path="/sellproduct" element={<Addproduct />} />
        <Route
          path="/product-types/mobiles"
          element={<Allproductpage type={"Mobile"} />}
        />
        <Route
          path="/product-types/laptops"
          element={<Allproductpage type={"Laptop"} />}
        />
        <Route
          path="/product-types/cameras"
          element={<Allproductpage type={"Camera"} />}
        />
        <Route
          path="/product-types/shoes"
          element={<Allproductpage type={"Shoes"} />}
        />
        <Route
          path="/product/:productType/:id"
          element={<SpecificProductpage />}
        />

        {/* {`/product/${p.id}/${p.productTitle}/${p.brand}/${p.customersupport}/ ${p.description}/${p.price}/${p.productType}/${p.productimage}/${p.warranty}`} */}

        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
