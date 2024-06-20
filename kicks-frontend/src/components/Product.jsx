import React, { useEffect, useState } from "react";
import Section from "./Section";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "./Button";
import {useDispatch, useSelector } from "react-redux";
import {  userDetails } from "../Redux/userSlice";

const Product = ({setAddtoCart ,addToCart ,baseURL}) => {
  const [product, setProduct] = useState({});
  const [mainImage, setMainImage] = useState("");
  const param = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {  isLoggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    try {
      const fetchProduct = async () => {
        const product = await axios.get(
          `${baseURL}api/v1/products/${param.id}`
        );
        setProduct(product.data.product);
        setMainImage(product.data.product.images[0]);
      };

      fetchProduct();
    } catch (error) {
      console.log(error);
    }
  }, [param.id]);
  

  const handleCart = async () => {
    try {
      const response = await axios.post(
        `${baseURL}api/v1/users/addtocart`,
        { products :product },
        {
          withCredentials: true,
        }
      );
      dispatch(userDetails(response.data.data))
      setAddtoCart([...addToCart ,product.name])
    } catch (error) {
      console.log(error)
    }
    
  };

  const handleCheckout =async ()=>{
    try {
      const productArray = [product]
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
    <Section>
      <div className="container">
        <div className="flex justify-center gap-20">
          <div className="flex">
            <div className=" relative w-[10rem] ">
              {product.images &&
                product.images.length > 0 &&
                product.images.map((image, index) => (
                  <div key={index} className="w-[6rem] h-[6rem]  mb-3  bg-white flex justify-center rounded-lg">
                    <img
                      className=" w-full h-full object-contain cursor-pointer hover:backdrop-saturate-125 rounded-lg"
                      onMouseOver={() => {
                        setMainImage(image);
                      }}
                      
                      src={`/products/${image}`}
                      alt={`Product Image ${index}`}
                    />
                  </div>
                ))}
            </div>
            <div className="w-[30rem] h-[30rem] border-2 mb-3 bg-white flex justify-center rounded-lg">
              {product.images && product.images.length > 0 && (
                <img
                  className="w-full h-full object-contain rounded-lg"
                  src={`/products/${mainImage}`}
                />
              )}
            </div>
          </div>
          <div className="w-[20rem]">
            <p className=" font-semibold text-2xl mb-1">{product.name}</p>
            <p className=" text-neutral-600 mb-2">Shoes</p>
            <div className=" top-1/2 left-1/2 w-full  border border-n-2/40  mb-10" />
            <p className=" font font-medium text-xl mb-1">
              USD ${product.price}
            </p>
            <p className="font-light text-sm text-neutral-600 mb-2">
              incl. of taxes <br />
              (Also includes all applicable duties)
            </p>
            <p className=" text-neutral-600 mb-2">Color : {product.color}</p>
            <div className="flex justify-center flex-col pt-16">
              {isLoggedIn ? (
                <Button
                  className={` bg-black w-full h-[4rem] mb-10  hover:bg-white hover:border-2 hover:border-color-1 hover:text-color-1`}
                  onClick={handleCart}
                >
                  Add to Cart
                </Button>
              ) : (
                <Button
                  className={` bg-black w-full h-[4rem] mb-10 hover:bg-white hover:border-2 hover:border-color-1 hover:text-color-1`}
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Add to Cart
                </Button>
              )}

              {isLoggedIn ? (
                <Button
                  className={` bg-black w-full h-[4rem] mb-5 hover:bg-white hover:border-2 hover:border-color-1 hover:text-color-1`}
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
              ) : (
                <Button
                  className={` bg-black w-full h-[4rem] mb-5 hover:bg-white hover:border-2 hover:border-color-1 hover:text-color-1`}
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Sign in to buy
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Product;
