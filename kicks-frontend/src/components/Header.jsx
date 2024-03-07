import React, { useState } from "react";
import { kicks_logo_png } from "../assets";
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "../design/Header";
import { enablePageScroll, disablePageScroll } from "scroll-lock";
import { Link } from "react-router-dom";

const Header = () => {
  const [openNavigation, setOpenNavigation] = useState(false);

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

  const handleClick = () => {
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
              <a className={navElementClassMobile} onClick={handleClick}>
                New Account
              </a>
              <a className={navElementClassMobile} onClick={handleClick}>
                Sign In
              </a>
            </div>
            <HamburgerMenu />
          </nav>
          <Link to="/" className=" block w-[12rem] xl:mr-8">
            <img src={kicks_logo_png} width={220} height={50} alt="Kicks" />
          </Link>

          <div className="relative z-2 flex flex-row items-center  lg:flex-row ">
            <Link
              to="/signup"
              className="hidden lg:flex relative font-code text-2xl uppercase text-n-8 transition-colors hover:text-color-1  px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-sm lg:font-semibold cursor-pointer lg:leading-5 lg:hover-text-n-1 xl:px-12"
            >
              New Account
            </Link>
            <Button className=" hidden lg:flex border-2 border-black hover:border-color-1  bg-black hover:bg-white mt-0">
              <Link to="/login">Sign IN</Link>
            </Button>

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

// lg:mx-auto
