import React from "react";
import { socials } from "../constants";
import Section from "./Section";

const Footer = () => {
  return (
    <Section className="!px-0 !py-10" crosses>
      <div className="container flex sm:justify-between justify-center items-center gap-10 max-sm:flex-col">
        <h3 className="caption text-n-4 lg:block">
          ©KICKS.All rights reserved
        </h3>
        <ul className="flex gap-5 flex-wrap">
          {socials.map((item) => (
            <a
              key={item.id}
              href={item.url}
              className=" flex items-center justify-center w-10 h-10 bg-n-1 rounded-full transition-colors hover:bg-n-6 "
              target="_blank"
            >
              <img
                src={item.iconUrl}
                className=" flex gap-5 flex-wrap"
                width={16}
                height={16}
              />
            </a>
          ))}
        </ul>
      </div>
    </Section>
  );
};

export default Footer;
