import React from "react";

const Button = ({ children, href, className, onClick, px, white, name }) => {
  const classes = `button relative inline-flex items-center justify-center h-11 transition-colors hover:text-color-1 ${
    px || "px-7"
  } ${white ? "text-n-8 " : "text-n-1"} ${className || ""} rounded`;

  const renderButton = () => (
    <button className={classes} onClick={onClick}>
      <span>{children}</span>
    </button>
  );

  const returnLink = () => (
    <a href={href} className={classes}>
      <span name={name}>{children}</span>
    </a>
  );

  return href ? returnLink() : renderButton();
};

export default Button;
