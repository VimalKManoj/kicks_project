import React, { useEffect, useState } from "react";
import Section from "./Section";
import { useParams ,useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "./Button";

const Product = () => {
  const [product, setProduct] = useState({});
  const [mainImage, setMainImage] = useState("");
  const param = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    try {
      const fetchProduct = async () => {
        const product = await axios.get(
          `http://localhost:3000/api/v1/products/${param.id}`
        );
        setProduct(product.data.product);
        setMainImage(product.data.product.images[0]);
      };

      fetchProduct();
    } catch (error) {
      console.log(error);
    }
  }, [param.id]);

  return (
    <Section>
      <div className="container">
        <div className="flex justify-center gap-20">
          <div className="flex">
            <div className=" relative w-[10rem]">
              {product.images &&
                product.images.length > 0 &&
                product.images.map((image, index) => (
                  <div className="w-[6rem] h-[6rem] border-2 mb-3 bg-white flex justify-center">
                    <img
                      className="w-full h-full object-contain cursor-pointer hover:backdrop-saturate-125"
                      onMouseOver={() => {
                        setMainImage(image);
                      }}
                      key={index}
                      src={`/products/${image}`}
                      alt={`Product Image ${index}`}
                    />
                  </div>
                ))}
            </div>
            <div className="w-[30rem] h-[30rem] border-2 mb-3 bg-white flex justify-center">
              {product.images && product.images.length > 0 && (
                <img
                  className="w-full h-full object-contain"
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
              <Button
                className={` bg-black w-full h-[4rem] mb-10 hover:text-neutral-50 hover:bg-slate-500`}
              >
                Add to Wishlist
              </Button>
              <Button
                className={` bg-black w-full h-[4rem] mb-5 hover:text-neutral-50 hover:bg-slate-500`}
                onClick={()=>{
                  navigate('/login')
                }}
              >
                Sign in to buy
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Product;
