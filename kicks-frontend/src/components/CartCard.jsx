import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userDetails, setCart } from "../Redux/userSlice";

const CartCard = ({ products, setCartProd ,baseURL}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(
          `${baseURL}api/v1/users/getcart`,
          {
            withCredentials: true,
          }
        );
        

        dispatch(setCart(response.data.cart));
      } catch (error) {
        console.log(error);
      }
    };

    fetchCart();
  }, [dispatch]);

  
  const handleRemoveWish = async () => {
    try {
      await axios.post(
        `${baseURL}api/v1/users/removefromcart`,
        { products },
        {
          withCredentials: true,
        }
      );

      setCartProd((setCartProd) =>
        setCartProd.filter((item) => item._id !== products._id)
      );
    } catch (error) {
      console.log(error);
    }
  };


  const handleCheckout =async ()=>{
    try {
      const productArray = [products]
      const response = await axios.post(`${baseURL}api/v1/users/checkout`,{products :productArray},
          {
            withCredentials: true,
          })
          console.log(response.data.session.url)
        
          if (response.data && response.data.session && response.data.session.url) {
           
            window.location.href = response.data.session.url;
          } else {
            console.error("No URL found in response");
          }
          
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div
      className={`mb-3 flex flex-col justify-center items-start xl:mb-6  text-col
              "xl:gap-2 w-[22rem]" : "xl:gap-2 w-[22rem]"
        `}
    >
      <div
        className={`flex items-center h-[10rem] w-full  bg-white p-4 overflow-hidden rounded-md border justify-between `}
      >
        <div className="flex flex-row h-full">
          <div className=" h-32 w-32 overflow-hidden rounded-md border ">
            <Link to={`/products/${products._id}`}>
              <img
                className="w-full bg-white   "
                src={`/products/${products?.images[0]}`}
              />
            </Link>
          </div>
          <div className="pl-5 flex flex-col justify-around h-full ">
            <h3 className="h4 font-light text-[12px] xl:pb-1 uppercase text-white bg-black rounded-2xl self-start p-2">
              {products?.category}
            </h3>
            <h3 className="h4  font-semibold text-[18px] xl:pb-1">
              {products?.name}
            </h3>
            <h3 className="h4  font-semibold text-[14px] xl:pb-1">
              <span className="text-gray-400 font-normal"> Color :</span>{" "}
              {products?.color}
            </h3>
          </div>
        </div>
        <div className="flex items-end flex-col justify-end h-full">
          <h3 className=" h4 font-normal text-red-950 text-[18px] uppercase mb-4 ">
            ${products?.price}.00
          </h3>
        <div className="flex ">
        <div
            className="  w-10 h-10 pr-2 z-10 flex justify-center items-center  cursor-pointer border-r"
            onClick={handleRemoveWish}
          >
            <DeleteIcon className="  text-gray-300  " fontSize="medium" />
          </div>
          <button className="ml-6 bg-gray-100 px-3 border rounded-md text-sm" onClick={handleCheckout}>Checkout</button>
        </div>
          
        </div>
      </div>
    </div>
  );
};

export default CartCard;
