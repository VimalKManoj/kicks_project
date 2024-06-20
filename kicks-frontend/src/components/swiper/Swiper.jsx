import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./styles.css";

// import required modules
import { Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";

export default function Slider({ slidesPerView ,setLink ,baseURL}) {
  const navigate = useNavigate();
  return (
    <>
      <Swiper
        slidesPerView={slidesPerView}
        centeredSlides={false}
        spaceBetween={12}
        grabCursor={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="h-full w-full relative overflow-hidden rounded" onClick={() => {
              setLink(`${baseURL}api/v1/products?brand=Adidas`)
              navigate('/products');

            }}>
            <img
              src="/brands/adidas_shoe.jpg"
              className="h-full w-full object-fit rounded border-2 border-color-7"
            />
            <div className="h-full w-full absolute bg-black/30 flex justify-center items-center -bottom-20 hover:-bottom-0 opacity-0 hover:opacity-100 transition-all duration-200 ">
              {/* backdrop-blur-sm */}
              <div className="h-[10rem] w-[15rem]">
                <img
                  src="/brands/adidas_logo.png"
                  className=" h-full w-full object-cover "
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-full w-full relative overflow-hidden rounded" onClick={() => {
              setLink(`${baseURL}api/v1/products?brand=Nike`)
              navigate('/products');

            }}>
            <img
              src="/brands/nike_shoe.webp"
              className="h-full w-full object-fit rounded border-2 border-color-7"
            />
            <div className="h-full w-full absolute bg-black/30 flex justify-center items-center -bottom-20 hover:-bottom-0 opacity-0 hover:opacity-100 transition-all duration-200 ">
              {/* backdrop-blur-sm */}
              <div className="h-[10rem] w-[18rem]">
                <img
                  src="/brands/nike_logo.png"
                  className=" h-full w-full object-cover "
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-full w-full relative overflow-hidden rounded" onClick={() => {
              setLink(`${baseURL}api/v1/products?brand=Reebok`)
              navigate('/products');

            }}>
            <img
              src="/brands/reebok_shoe.webp"
              className="h-full w-full object-fit rounded border-2 border-color-7"
            />
            <div className="h-full w-full absolute bg-black/30 flex justify-center items-center -bottom-20 hover:-bottom-0 opacity-0 hover:opacity-100 transition-all duration-200 ">
              {/* backdrop-blur-sm */}
              <div className="h-[10rem] w-[15rem]">
                <img
                  src="/brands/reebok_logo.png"
                  className=" h-full w-full object-cover "
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-full w-full relative overflow-hidden rounded" onClick={() => {
              setLink(`${baseURL}api/v1/products?brand=New Balance`)
              navigate('/products');

            }}>
            <img
              src="/brands/new_shoe.webp"
              className="h-full w-full object-fit rounded border-2 border-color-7"
            />
            <div className="h-full w-full absolute bg-black/30 flex justify-center items-center -bottom-20 hover:-bottom-0 opacity-0 hover:opacity-100 transition-all duration-200 ">
              {/* backdrop-blur-sm */}
              <div className="h-[10rem] w-[15rem]">
                <img
                  src="/brands/new_logo.png"
                  className=" h-full w-full object-cover "
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="h-full w-full relative overflow-hidden rounded"
            onClick={() => {
              setLink(`${baseURL}api/v1/products?brand=Asics`)
              navigate('/products');

            }}
          >
            <img
              src="/brands/asics_shoe.webp"
              className="h-full w-full object-fit rounded border-2 border-color-7"
            />
            <div className="h-full w-full absolute bg-black/30 flex justify-center items-center -bottom-20 hover:-bottom-0 opacity-0 hover:opacity-100 transition-all duration-200 ">
              {/* backdrop-blur-sm */}
              <div className="h-[6rem] w-[18rem]">
                <img
                  src="/brands/asics_logo.png"
                  className=" h-full w-full object-cover "
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-full w-full relative overflow-hidden rounded" onClick={() => {
              setLink(`${baseURL}api/v1/products?brand=ANTA`)
              navigate('/products');

            }}>
            <img
              src="/brands/anta_shoe.webp"
              className="h-full w-full object-fit rounded border-2 border-color-7"
            />
            <div className="h-full w-full absolute bg-black/30 flex justify-center items-center -bottom-20 hover:-bottom-0 opacity-0 hover:opacity-100 transition-all duration-200 ">
              {/* backdrop-blur-sm */}
              <div className="h-[10rem] w-[15rem]">
                <img
                  src="/brands/anta_logo.png"
                  className=" h-full w-full object-cover "
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
