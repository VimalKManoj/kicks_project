import React, { useEffect, useState } from "react";
import { kicks_logo_png } from "../assets";
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "../design/Header";
import { enablePageScroll, disablePageScroll } from "scroll-lock";
import { Link } from "react-router-dom";
import {  useSelector } from "react-redux";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ProfileDropdown from "./ProfileDropdown";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header = ({ setLink , cartProd  ,setCartProd ,addToCart ,baseURL ,frontendURL}) => {



  useEffect(() => {
    try {
      const fetchProd = async () => {
        
        const response = await axios.get(
          `${baseURL}api/v1/users/getcart`,
          {
            withCredentials: true,
          }
        );
        setCartProd(response.data.cart);
      };

      fetchProd();
    } catch (error) {
      console.log(error);
    } 
  }, [addToCart]);

  const navigate = useNavigate()
  const [openNavigation, setOpenNavigation] = useState(false);
  const {  isLoggedIn } = useSelector((state) => state.user);

  const navElementClassMobile = `block relative font-code text-2xl uppercase text-n-8 transition-colors hover:text-color-1 lg:hidden px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-sm lg:font-semibold `;
  const navElementClassLarge = `block relative font-code text-2xl uppercase text-n-8 transition-colors hover:text-color-1  px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-sm lg:font-semibold cursor-pointer lg:leading-5 lg:hover-text-n-1 xl:px-12`;

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = (e) => {
    if (e.target.href === `${frontendURL}products`)
      setLink(`${baseURL}api/v1/products`);
    if (!openNavigation) return;

    enablePageScroll();
    setOpenNavigation(false);
  };
  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full z-50 border-b border-n-6/50 lg:bg-n-1/80 lg:backdrop-blur-sm ${
          openNavigation ? "bg-n-1" : "bg-n-1/20 backdrop-blur-sm"
        }`}
      >
        <div className="flex items-center justify-between lg:justify-around px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
          <nav
            className={`${
              openNavigation ? "flex" : "hidden"
            }  fixed top-[5rem] left-0 right-0 bottom-0 bg-n-1/90 lg:static lg:flex  lg:bg-transparent`}
          >
            <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row ">
              <Link
                to="/products"
                className={navElementClassLarge}
                onClick={handleClick}
              >
                Products
              </Link>
              <Link
                to="/reviews"
                className={navElementClassLarge}
                onClick={handleClick}
              >
                Reviews
              </Link>
              {isLoggedIn ? (
                <>
                  <Link
                    to="/profile"
                    className={navElementClassMobile}
                    onClick={handleClick}
                  >
                    profile
                  </Link>
                  <Link
                    to="/cart"
                    className={navElementClassMobile}
                    onClick={handleClick}
                  >
                    Cart
                  </Link>
                  <Link
                    to="/"
                    className={navElementClassMobile}
                    onClick={handleClick}
                  >
                    Logout
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className={navElementClassMobile}
                    onClick={handleClick}
                  >
                    New Account
                  </Link>
                  <Link
                    to="/login"
                    className={navElementClassMobile}
                    onClick={handleClick}
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
            <HamburgerMenu />
          </nav>
          <Link to="/" className=" block w-[12rem] xl:mr-32">
            <img src={kicks_logo_png} width={220} height={50} alt="Kicks" />
          </Link>

          <div className="relative z-2 flex flex-row items-center  lg:flex-row ">
            {isLoggedIn ? (
              <>
                <ProfileDropdown  baseURL={baseURL}> 
                  <Link
                    to="/profile"
                    className="hidden lg:flex relative font-code text-2xl uppercase text-n-8 transition-colors hover:text-color-1  px-6 py-6 md:py-8 lg:-mr-0.4 lg:text-sm lg:font-semibold cursor-pointer lg:leading-5 lg:hover-text-n-1 xl:px-6"
                    onClick={handleClick}
                  >
                    
                  </Link>
                </ProfileDropdown>
                <Link
                  to="/cart"
                  className="hidden lg:flex relative font-code text-2xl uppercase ml-4 text-n-8 transition-colors hover:text-color-1  px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-sm lg:font-semibold cursor-pointer lg:leading-5 lg:hover-text-n-1 xl:px-6"
                  onClick={handleClick}
                >
                  <div className="relative w-10 h-10 flex justify-center items-center rounded shadow-md ">
                  {cartProd && cartProd.length > 0 && <div className="flex justify-center items-center w-4 h-4  absolute -top-1 -right-1 bg-red-500 rounded-full text-[10px] text-white">{cartProd.length}</div>}
                    <ShoppingCartIcon />
                  </div>
                </Link>
                {/* <Link
                  to="/wishlist"
                  className="hidden lg:flex relative font-code text-2xl uppercase text-n-8 transition-colors hover:text-color-1  px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-sm lg:font-semibold cursor-pointer lg:leading-5 lg:hover-text-n-1 xl:px-6"
                  onClick={handleClick}
                >
                  <div className=" w-10 h-10 flex justify-center items-center rounded shadow-md mr-8">
                    <FavoriteIcon/>
                  </div>
                </Link> */}
              </>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="hidden lg:flex relative font-code text-2xl uppercase text-n-8 transition-colors hover:text-color-1  px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-sm lg:font-semibold cursor-pointer lg:leading-5 lg:hover-text-n-1 xl:px-12"
                >
                  New Account
                </Link>
                <Link to="/login">
                  <Button className=" hidden lg:flex border-2 border-black hover:border-color-1  bg-black hover:bg-white mt-0">
                    Login
                  </Button>
                </Link>
              </>
            )}

            <Button
              className=" mr-1  ml-auto lg:hidden  bg-black px-3"
              onClick={toggleNavigation}
            >
              <MenuSvg openNavigation={openNavigation} />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;


