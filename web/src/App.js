import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Addproduct from "./components/Admin-portal/addItem/addItem";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sellproduct" element={<Addproduct />} />
        <Route path="/sellproduct" element={<Addproduct />} />


        {/* {`/product/${p.id}/${p.productTitle}/${p.brand}/${p.customersupport}/ ${p.description}/${p.price}/${p.productType}/${p.productimage}/${p.warranty}`} */}

        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
