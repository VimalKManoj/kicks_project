// import Button from "./components/Button";
import React, { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import { Route, Routes } from "react-router-dom";
import Products from "./components/Products";
import Reviews from "./components/Reviews";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Product from "./components/Product";


const App = () => {
  const [link, setLink] = useState("http://localhost:3000/api/v1/products");
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header setLink={setLink} link={link} />
        <Routes>
          <Route path="/" element={<Hero />} />

          <Route
            path="/products"
            element={<Products setLink={setLink} link={link} />}
          />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default App;

{
  /* <Button className="border-2 border-black hover:border-color-1 mt-10 bg-black hover:bg-white ">
          Login
        </Button> */
}
