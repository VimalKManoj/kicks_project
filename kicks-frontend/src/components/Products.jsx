import React, { useEffect, useState } from "react";
import Section from "./Section";
import axios from "axios";
import ShoeCard from "./ShoeCard";
import TuneSharpIcon from "@mui/icons-material/TuneSharp";
import RestartAltTwoToneIcon from "@mui/icons-material/RestartAltTwoTone";
import Loading from "./Loading";
import Button from "./Button";
import { motion } from "framer-motion";
import SortByDrop from "./SortByDrop";

const Products = ({ link, setLink ,baseURL}) => {
  const [products, setProducts] = useState([]);
  const [reset, setReset] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filterToggle, setFilterToggle] = useState(false);

  const filtering = (e) => {
    const value = e.target.innerText.toLowerCase();

    setLink(`${baseURL}api/v1/products?category=${value}`);
    setReset(true);
  };

  const brandFilter = (e) => {
    const value = e.target.innerText;
    setLink(`${baseURL}api/v1/products?brand=${value}`);
    setReset(true);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);

      try {
        const products = await axios.get(link);
        setProducts(products.data.data.doc);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [link]);

  const hideFilter = () => {
    setFilterToggle(!filterToggle);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 1,
        ease: "easeOut",
      }}
    >
      <Section className=" lg:pt-10  xl:py-12 lg:px-14">
        <div className="container flex flex-col justify-center p-0">
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <div className="hidden lg:flex mb-5 justify-end xl:m-0 xl:mb-10  font-normal text-[1rem] font-grotesk ">
                <h1
                  className=" cursor-pointer select-none  mr-5 "
                  onClick={hideFilter}
                >
                  {filterToggle ? "Show filters " : " Hide filters "}
                  <TuneSharpIcon sx={{ fontSize: 20 }} />
                </h1>
                <h1 className=" cursor-pointer select-none ">
                  <SortByDrop setLink={setLink} baseURL={baseURL}/>
                </h1>
              </div>

              <div className=" flex md:justify-center lg:justify-between gap-10  items-start overflow-hidden  ">
                <div
                  className={`hidden transition-all lg:flex w-[17rem] ${
                    filterToggle
                      ? "-translate-x-[20rem] lg:hidden "
                      : "-translate-x-[0rem] "
                  } flex-col  overflow-hidden `}
                >
                  <div className="flex justify-between items-center">
                    <h1 className="h4 mb-3 font-bold cursor-default">
                      Filters
                    </h1>
                    {reset && (
                      <div className="flex">
                        <RestartAltTwoToneIcon />
                        <h1
                          className="h5 text-xl mb-3 font-normal cursor-pointer"
                          onClick={() => {
                            setLink(`${baseURL}api/v1/products`);
                            setReset(false);
                          }}
                        >
                          Reset
                        </h1>
                      </div>
                    )}
                  </div>

                  <div className=" top-1/2 left-1/2 w-full  border border-n-2/40  mb-3" />
                  <div className="flex flex-col gap mb-3">
                    <h1 className=" font-semibold mb-3 cursor-default">
                      Categories
                    </h1>
                    <div>
                      <Button
                        onClick={filtering}
                        className={` bg-black w-[7rem] h-[2.4rem] mr-3 mb-3 active:text-color-1`}
                        name="lifestyle"
                      >
                        Lifestyle
                      </Button>
                      <Button
                        className={` bg-black w-[7rem] h-[2.4rem] mb-1`}
                        onClick={filtering}
                      >
                        Running
                      </Button>
                      <Button
                        className={` bg-black w-[7rem] h-[2.4rem] mb-1`}
                        onClick={filtering}
                      >
                        Training
                      </Button>
                    </div>
                  </div>
                  <div className=" top-1/2 left-1/2 w-full  border border-n-2/40  mb-3 " />
                  <div className="flex flex-col mb-3">
                    <h1 className=" font-semibold mb-3 cursor-default">
                      Brands
                    </h1>
                    <a className="mb-1 cursor-pointer hover:text-color-1" onClick={brandFilter}>
                      Adidas
                    </a>
                    <a className="mb-1 cursor-pointer hover:text-color-1" onClick={brandFilter}>
                      New Balance
                    </a>
                    <a className="mb-1 cursor-pointer hover:text-color-1" onClick={brandFilter}>
                      Reebok
                    </a>
                    <a className="mb-1 cursor-pointer hover:text-color-1" onClick={brandFilter}>
                      Nike
                    </a>
                    <a className="mb-1 cursor-pointer hover:text-color-1" onClick={brandFilter}>
                      Asics
                    </a>
                    <a className="mb-1 cursor-pointer hover:text-color-1" onClick={brandFilter}>
                      ANTA
                    </a>
                  </div>
                  <div className=" top-1/2 left-1/2 w-full  border border-n-2/40  mb-3" />
                </div>

                <ShoeCard products={products} filterToggle={filterToggle} />
              </div>
              <div className="flex justify-center mt-12">
              <Button
              onClick={()=>{reset?(setLink(`${link}&limit=20`)):(setLink(`${link}?limit=20`)) }}
                className={` bg-black w-[16rem] h-[2.4rem] mr-3 mb-3 active:text-color-1`}
              >
                Load More
              </Button>
              </div>
              
            </>
          )}
        </div>
      </Section>
    </motion.div>
  );
};

export default Products;
