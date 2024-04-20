import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Login from "./components/Login";
import Product from "./components/Product";
import Products from "./components/Products";
import Profile from "./components/Profile";
import Reviews from "./components/Reviews";
import Signup from "./components/Signup";
import Cart from "./components/Cart";
import Wishlist from "./components/wishlist";

const App = () => {
  const { isLoggedIn } = useSelector((state) => state.user);
  const [link, setLink] = useState("http://localhost:3000/api/v1/products");
  console.log(isLoggedIn);
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

          <Route
            path="/profile"
            element={isLoggedIn ? <Profile /> : <Login />}
          />

          <Route
            path="/wishlist"
            element={isLoggedIn ? <Wishlist /> : <Login />}
          />
          <Route path="/cart" element={isLoggedIn ? <Cart /> : <Login />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default App;
