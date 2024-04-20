import React from "react";
import { Link } from "react-router-dom";

const ShoeCard = ({ products, filterToggle }) => {
  return (
    <section className="w-full flex-1">
      <div
        className={`w-full flex flex-row flex-wrap justify-center xl:justify-between gap-3 lg:gap-20 xl:gap-10 
           ${filterToggle ? "xl:gap-10" : "xl:gap-2"}`}
      >
        {products?.map((item) => (
          <Link
            to={`/products/${item._id}`}
            className={`mb-3 flex flex-col xl:mb-9 cursor-pointer ${
              filterToggle ? "xl:gap-2 w-[22rem]" : "xl:gap-2 w-[22rem]"
            }`}
            key={item._id}
          >
            <div
              className={`relative h-[22rem] w-[22rem]  bg-white mb-3 overflow-hidden rounded-md`}
            >
              <div className=" absolute top-0 left-0 overflow-hidden ">
                <img
                  className="w-full bg-white mb-7  "
                  src={`/products/${item.images[0]}`}
                />
              </div>
            </div>
            <h3 className="h4  font-semibold text-[14px] xl:pb-0">
              {item.name}
            </h3>
            <h3 className="h4 font-light text-[14px] xl:pb-0 uppercase ">
              {item.category}
            </h3>
            <h3 className=" h4 font-semibold text-red-950 text-[14px] uppercase ">
              ${item.price}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ShoeCard;

{
  /* <div
            className={`  origin-top-right transition-all  ${
              filterToggle ? "scale-90" : " scale-1"
            } flex-1 flex-row flex flex-wrap gap-2 justify-center lg:justify-between`}
          >
            {products?.map((item) => (
              <div
                className=" flex flex-col mb-9 cursor-pointer "
                key={item._id}
              >
                <div
                  className={` ${
                    filterToggle
                      ? " h-[23rem] w-[23rem]"
                      : "h-[28rem] w-[28rem]"
                  } relative h-[23rem] w-[23rem] bg-white mb-3 overflow-hidden `}
                >
                  <div className=" absolute top-0 left-0 overflow-hidden ">
                    <img
                      className="w-full bg-white mb-7  "
                      src={`/products/${item.images[0]}`}
                    />
                  </div>
                </div>
                <h3 className=" h2 font-semibold text-[14px] pb-2">
                  {item.name}
                </h3>
                <h3 className=" h2 font-light text-[14px] pb-2 uppercase ">
                  {item.category}
                </h3>
                <h3 className=" h2 font-semibold text-red-950 text-[14px] uppercase ">
                  ${item.price}
                </h3>
              </div>
            ))}
          </div> */
}
