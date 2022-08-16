import React, { useEffect, useState } from "react";
import Login from "./components/Pages/Login";
import Signup from "./components/Pages/Signup";
import { Routes, Route } from "react-router-dom";
import Header from "./components/UI/Header";
import Product from "./components/Pages/Product";
import Home from "./components/Pages/Home";
import AddProduct from "./components/Pages/AddProduct";
import ProtectRoute from "./utils/ProtectRoute";
import AdminRoute from "./utils/AdminRoute";
import Order from "./components/Pages/Order";
import Common from "./utils/Common";
import Profile from "./components/Pages/Profile";
import Cart from "./components/Pages/Cart";
import { useSelector } from "react-redux";
const App = () => {
  const [search, setSearch] = useState();
  const admin = useSelector((state) => state.auth.isAdmin);
  const login = useSelector((state) => state.auth.isLogin);
  
  const searchHandler = (data) => {
    setSearch(data);
  };
  return (
    <>
     {login && (<Header search={searchHandler} />)}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />  
        <Route element={<ProtectRoute/>}>
        <Route path="/" element={<Home searchData={search} />} />
        <Route path="/api/product/:id" element={<Product/>} />      
        <Route path="/api/cart/" element={<Cart/>} />      
        <Route path="/api/order" element={<Order searchData={search}/>} />   
        <Route path="/api/profile" element={<Profile/>} />  
        {admin && (<Route path="/api/product/" element={<AddProduct page="add" />} />)}
        {admin && (<Route path="/api/product/edit/:id" element={<AddProduct page="edit" />} />)}
       </Route>
        <Route path={'*'} />
      </Routes>
    </>
  );
};

export default App;
