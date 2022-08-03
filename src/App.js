import React, { useState } from "react";
import Login from "./components/Pages/Login";
import Signup from "./components/Pages/Signup";
import { Routes, Route } from "react-router-dom";
import Header from "./components/UI/Header";
import Product from "./components/Pages/Product";
import Home from "./components/Pages/Home";
const App = () => {
  const [search,setSearch]=useState()
  const searchHandler=(data)=>{
    setSearch(data);
  }
  console.log(search)
  return (
    <>
      <Header search={searchHandler}/>
      <Routes>
        <Route path='/' element={<Home  searchData={search}/>} />
        <Route path="/login"  element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/api/product/:id" element={<Product/>} />

      </Routes>
    </>
  );
};

export default App;
