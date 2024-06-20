import axios from "axios";
import React, { useEffect, useState } from "react";
import Section from "./Section";

export const Orders = ({baseURL}) => {
  const [orders, setOrders] = useState([]);
  const [orderedProducts, setOrderedProducts] = useState([]);

  useEffect(() => {
    try {
      const fetchProduct = async () => {
        const response = await axios.get(
          `${baseURL}api/v1/users/getorders`,
          {
            withCredentials: true,
          }
        );
        setOrders(response.data.products);
        setOrderedProducts(response.data.bookings);
      };
      console.log(orders);
      fetchProduct();
    } catch (error) {
      console.log(error);
    }
  }, []);
  
  return (
    <Section>
      <div className="container flex">
        <div className="flex flex-col flex-1 ml-12">
          <div className="flex flex-1 p-3 font-semibold text-xl">My Orders</div>
          <div className=" top-1/2 left-1/2 w-full  border border-n-2/40  mb-10" />
          <div className="flex justify-around font-semibold">
            <p className="w-[6rem] mb-10">Order</p>
            <p className="w-[10rem] mb-10"> </p>
            <p className="w-[3rem] mb-10">Price </p>
            <p className="w-[12rem] mb-10"> Order ID </p>
            <p className="w-[12rem] mb-10">Ordered Date</p>
            <p className="w-[6rem] mb-10">Status</p>
          </div>

          {orderedProducts.map((order) => (
            <div key={order._id}>
              {order.products.map((productId) => {
                const product = orders.find((prod) => prod._id === productId);
                return (
                  <div key={productId}>
                    <div
                      className="flex xl:flex-row flex-col xl:justify-around items-center flex-wrap"
                    >
                      <div className="w-[6rem] mb-10">
                        <div className="w-28 h-28 overflow-hidden rounded-md border-2">
                          <img
                            className="w-full h-full"
                            src={`/products/${product.images[0]}`}
                            alt="Product Image"
                          />
                        </div>
                      </div>
                      <p className="w-[10rem] mb-10">{product.name}</p>
                      <p className="w-[3rem] mb-10"> {product.price}</p>
                      <h2 className="w-[12rem] mb-10">
                        {" "}
                         {order._id}
                      </h2>
                      <h2 className="w-[12rem] mb-10">
                        
                        {new Date(order.createdAt * 1000).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </h2>{" "}
                      <h2 className="bg-green-400 rounded-3xl text-[12px] border border-green-900 text-green-900 mb-10 p-2">Processing</h2>
                    </div>
                    <div className=" top-1/2 left-1/2 w-full  border border-n-2/40  mb-10" />
                  </div>
                );
              })}
            </div>
          ))}

         
        </div>
      </div>
    </Section>
  );
};

export default Orders;
