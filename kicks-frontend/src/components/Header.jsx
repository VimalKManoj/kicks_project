import React from "react";
import { kicks_logo_png } from "../assets";

const Header = () => {
  return (
    <div className="fixed top-0 z-50 bg-n-1/90 backdrop-blur-sm border-b border-n-6/50 lg:bg-n-1/80 lg:backdrop-blur-sm">
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <a className=" block w-[12rem] xl:mr-8" href="#hero">
          <img src={kicks_logo_png} width={190} height={40} alt="Kicks" />
        </a>
        <nav className="hidden "></nav>
      </div>
    </div>
  );
};

export default Header;
