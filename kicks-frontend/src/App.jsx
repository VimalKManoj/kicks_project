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
import PaymentSuccess from "./components/PaymentSuccess";
import PaymentFailure from "./components/PaymentFailure";
import { Orders } from "./components/Orders";
import UpdateData from "./components/UpdateData";

const App = () => {
  const baseURL = "https://kicks-project-backend.vercel.app/";
  const frontendURL = "https://kicks-project.vercel.app/";
  const { isLoggedIn } = useSelector((state) => state.user);
  const [link, setLink] = useState(`${baseURL}api/v1/products`);
  const [cartProd, setCartProd] = useState([]);
  const [addToCart, setAddtoCart] = useState([]);

  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header
          setLink={setLink}
          cartProd={cartProd}
          setCartProd={setCartProd}
          addToCart={addToCart}
          baseURL={baseURL}
          frontendURL={frontendURL}
        />
        <Routes>
          <Route
            path="/"
            element={<Hero setLink={setLink} link={link} baseURL={baseURL} />}
          />
          <Route
            path="/products"
            element={
              <Products setLink={setLink} link={link} baseURL={baseURL} />
            }
          />
          <Route
            path="/products/:id"
            element={
              <Product
                setCartProd={setCartProd}
                setAddtoCart={setAddtoCart}
                addToCart={addToCart}
                baseURL={baseURL}
              />
            }
          />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/signup" element={<Signup baseURL={baseURL} />} />
          <Route path="/login" element={<Login baseURL={baseURL} />} />

          <Route
            path="/profile"
            element={
              isLoggedIn ? (
                <Profile isLoggedIn={isLoggedIn} baseURL={baseURL} />
              ) : (
                <Login baseURL={baseURL} />
              )
            }
          ></Route>
          <Route
            path="/orders"
            element={
              isLoggedIn ? (
                <Orders isLoggedIn={isLoggedIn} baseURL={baseURL} />
              ) : (
                <Login baseURL={baseURL} />
              )
            }
          />

          <Route path="/payment_success" element={<PaymentSuccess baseURL={baseURL}/>} />
          <Route path="/payment_failure" element={<PaymentFailure baseURL={baseURL}/>} />
          <Route
            path="/cart"
            element={
              isLoggedIn ? (
                <Cart cartProd={cartProd} setCartProd={setCartProd} baseURL={baseURL}/>
              ) : (
                <Login baseURL={baseURL}/>
              )
            }
          />
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default App;
