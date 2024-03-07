// import Button from "./components/Button";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import { Route, Routes } from "react-router-dom";
import Products from "./components/Products";
import Reviews from "./components/Reviews";
import Signup from "./components/Signup";
import Login from "./components/Login";

const App = () => {
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header />
        <Routes>
          <Route path="/" element={<Hero />} />
         
          <Route path="/products" element={<Products />} />
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
