import axios from "axios";
import React, { useEffect, useState } from "react";

export const Orders = () => {
    const [orders , setOrders ] = useState()
    
  useEffect(() => {
    try {
      const fetchProd = async () => {
        const response = await axios.get(
          "http://localhost:3000/api/v1/users/getorders",
          {
            withCredentials: true,
          }
        );
        setOrders(response.data.booking)
      };
    
      fetchProd();
    } catch (error) {
      console.log(error);
    } 
  }, []);
  return (
    <div className="flex flex-col flex-1 ml-12">
      <div className="flex flex-1 p-3 font-semibold text-xl">My Orders</div>
      <div className=" top-1/2 left-1/2 w-full  border border-n-2/40  mb-10" />
    </div>
  );
};
