import React, { useEffect, useState } from "react";
import Section from "./Section";
import Button from "./Button";
import axios from "axios";
import Loading from "./Loading";
import { useNavigate ,redirect } from "react-router-dom";
import CartCard from "./CartCard";

const Wishlist = ({setCartProd , cartProd}) => {
  
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  

  useEffect(() => {
    try {
      const fetchProd = async () => {
        setIsLoading(true);
        const response = await axios.get(
          "http://localhost:3000/api/v1/users/getcart",
          {
            withCredentials: true,
          }
        );
        setCartProd(response.data.cart);
      };

      fetchProd();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCheckout =async ()=>{
    try {
      
      const response = await axios.post("http://localhost:3000/api/v1/users/checkout",{products :cartProd},
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
    <Section className={"min-h-[40rem]"}>
      <div className="container flex flex-col ">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className=" flex justify-between items-center flex-1 ">
              <h4 className=" h4 font-semibold  pb-8">
                My Cart {`(${cartProd?.length})`}
              </h4>
            </div>
            {cartProd && cartProd.length > 0 ? (
              <div className="flex gap-3">
                <div className="flex flex-col gap-3 w-3/5">
                  {cartProd.map((item) => (
                    <CartCard
                      key={item._id}
                      products={item}
                      setCartProd={setCartProd}
                    />
                  ))}
                </div>
                <div className=" flex flex-col w-2/5 h-72 bg-white p-6 overflow-hidden rounded-md border justify-between items-center">
                  <h2 className="h5 font-semibold">Order Summary</h2>
                  <div className="p-6 flex flex-col justify-start w-full">
                    <h2 className="flex justify-between font-semibold mb-2">
                      <span className=" text-gray-500 font-normal">Items in order :</span> {cartProd?.length}</h2>
                    <h2 className="flex justify-between font-semibold mb-2" ><span className=" text-gray-500 font-normal" >Delivery :</span> $5.00 </h2>
                    <h2 className="flex justify-between font-semibold">
                      <span className=" text-gray-500 font-normal">Total :{" "}</span>
                      
                      ${cartProd.reduce((acc, item) => (acc += item.price), 0)+ 10}.00
                    </h2>
                  </div>
                  <button className="bg-black text-white w-60 h-10 rounded-lg " onClick={handleCheckout}>Buy Now</button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center w-full">
                <h1 className="w-full text-center text-sm m-10">
                  You haven't added any product to cart yet.
                </h1>
                <Button
                  className={"bg-black"}
                  onClick={() => navigate("/products")}
                >
                  Shop now
                </Button>
              </div>
            )}
            <div
              className={`mt-10 flex flex-row flex-wrap justify-center xl:justify-start gap-3 lg:gap-20 xl:gap-10`}
            ></div>
          </>
        )}
      </div>
    </Section>
  );
};

export default Wishlist;
