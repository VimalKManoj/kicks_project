import React from "react";
import { socials } from "../constants";

const Footer = () => {
  return (
    <div className="container flex bg-n-8/80 ">
      <h3>©All rights reserved</h3>
      {socials.map((item) => {
        <a
          key={item.id}
          href={item.url}
          className=" flex items-center w-10 h-10 bg-n-7/70 rounded-full transition-colors hover:bg-n-6"
          target="_blank"
        >
          <img
            src={item.iconUrl}
            className=" flex gap-5 flex-wrap"
            width={16}
            height={16}
          />
        </a>;
      })}
    </div>
  );
};

export default Footer;
