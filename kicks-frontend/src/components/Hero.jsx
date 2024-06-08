import React, { useRef } from "react";
import Section from "./Section";
import { ArrowDownRightIcon } from "@heroicons/react/24/solid";
import {
  air_jordan,
  air_jordan_1,

  new_balance_2,
  new_balance_3,
  nike_air_force_1,
  nike_air_force_3,
  shoe_1,
  shoe_background,
  shoes_2,
} from "../assets";
import { BackgroundCircles } from "../design/Hero";
import { ScrollParallax } from "react-just-parallax";
import Button from "./Button";
import Slider from "./swiper/Swiper";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";


const Hero = ({link  , setLink}) => {
  const navigate = useNavigate();
  const parallaxRef = useRef(null);
  return (
    <motion.div
      // className="box"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 1.8,

        ease: "easeOut",
      }}
    >
      <Section
        className="pt-[12rem] -mt-[9rem] lg:-mt-[10rem]"
        crosses
        crossesOffset="lg:translate-y-[5.25rem]"
        customPaddings
        id="hero"
      >
        <div
          className=" container relative  md:mb-[4rem] mb-[2rem] xl:mb-0"
          ref={parallaxRef}
        >
          <div className=" relative z-1 max-w-[62rem] mx-auto text-center mb-[4rem] lg:mb-[6rem] font-archivo select-none">
            <h1 className="text-7xl lg:text-[8rem] mb-6">
              DO IT{" "}
              <span className=" inline-block relative text-color-1">RIGHT</span>
            </h1>
          </div>
          <div className="relative -mt-[1.8rem] lg:-mt-[4rem] max-w-[23rem] mx-auto md:max-w-4xl lg:max-w-6xl xl:mb-24">
            <div className="relative z-1 p-0.5 rounded-2xl bg-conic-gradient">
              <div className="relative bg-n-8 rounded-[1rem]">
                <div className="h-[1.4rem] bg-n-10 rounded-t-[0.9rem]" />

                <div className="-mt-[1.4rem] aspect-[40/30] md:aspect-[40/30] lg:aspect-[40/20] rounded-[0.9rem] overflow-hidden">
                  <img
                    src={shoe_background}
                    className=" w-full scale-[1.4] lg:scale-[1.0] lg:-translate-y-20"
                    width={1440}
                    height={1}
                  />

                  <ScrollParallax isAbsolutelyPositioned>
                    <ul className="hidden absolute -left-20 top-[22rem] px-1 py-1 bg-n-2/60 backdrop-blur border border-n-1/10 rounded-2xl md:flex xl:flex ">
                      <li className=" p-5 px-7 text-xl uppercase font-mono font-semibold">
                        Styles For Self Love
                      </li>
                    </ul>
                    <ul className="hidden absolute -right-20 top-[10rem] px-1 py-1 bg-n-2/60 backdrop-blur border border-n-1/10 rounded-2xl xl:flex ">
                      <div className=" aspect-[40/30] lg:aspect-auto rounded-[0.9rem] overflow-hidden">
                        <img
                          src={shoe_1}
                          className=" w-[10rem] scale-[1.4] lg:scale-[1.2]"
                          width={1440}
                          height={1}
                        />
                      </div>
                    </ul>
                    <ul className="hidden absolute -right-20 top-[20rem] px-1 py-1 bg-n-2/60 backdrop-blur border border-n-1/10 rounded-2xl xl:flex ">
                      <div className=" aspect-[40/30] lg:aspect-auto rounded-[0.9rem] overflow-hidden">
                        <img
                          src={shoes_2}
                          className=" w-[12rem] scale-[1.4] lg:scale-[1.2]"
                          width={1440}
                          height={1}
                        />
                      </div>
                    </ul>
                  </ScrollParallax>
                </div>
              </div>
            </div>
          </div>
          <BackgroundCircles />
        </div>
        <div className="container px-9 md:px-20  lg:py-0 xl:-mt-12">
          <h1 className="text-2xl font-semibold lg:text-7xl xl:text-8xl  xl:  ml-10 uppercase font-grotesk">
            Don't miss out
            <br />
            <span className=" flex justify-end items-center text-right mx-auto w-full  ">
              new drops
              <Button
                className="text-n-8 hover:text-color-1 "
                onClick={() => {
                  navigate("/products");
                }}
              >
                <ArrowDownRightIcon className="h-[2rem] w-[2rem] lg:h-[4rem] lg:w-[4rem] xl:h-[6rem] xl:w-[6rem]" />
              </Button>
            </span>
          </h1>
        </div>
      </Section>
      <Section>
        <div className="container">
          <div className="relative">
            <div className="relative z-1 grid gap-1 lg:grid-cols-2">
              <div className="relative min-h-[39rem] border border-n-1/90 rounded-3xl overflow-hidden">
                <div
                  className="absolute inset-0 cursor-pointer"
                  onClick={() => {
                    navigate("/products/65e9f88f54986f2fc374d939");
                  }}
                >
                  <img
                    src={new_balance_3}
                    className="z-4 h-full w-full object-cover hover:opacity-0 transition-opacity"
                    width={630}
                    height={750}
                    alt="robot"
                  />
                  <img
                    src={new_balance_2}
                    className="-z-1 absolute top-0 w-full h-full object-cover opacity-1 transition-opacity "
                    width={800}
                    height={730}
                  />
                </div>

                <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-b from-n-8/0 to-n-8/80 lg:p-15 pointer-events-none">
                  <h4 className="h4 -mb-6  text-n-3 font-grotesk">
                    9060 New Balance
                  </h4>
                </div>
              </div>

              <div className="p-1  flex gap-2 flex-col justify-end rounded-3xl overflow-hidden lg:min-h-[46rem] max-h-[46rem] ">
                <div className="relative h-[20rem] bg-n-1 rounded-3xl overflow-hidden md:h-[25rem] border border-n-1/90 cursor-pointer">
                  <div
                    className="absolute inset-0 cursor-pointer"
                    onClick={() => {
                      navigate("/products/65e9f88f54986f2fc374d93c");
                    }}
                  >
                    <img
                      src={air_jordan_1}
                      className="z-1 absolute xl:-translate-y-[10rem] object-fit hover:opacity-0 transition-opacity "
                      width={650}
                      height={400}
                      alt="Scary robot"
                    />

                    <img
                      src={air_jordan}
                      className="z-1 h-full w-full object-cover opacity-1 transition-opacity "
                     
                      alt="Scary robot"
                    />
                  </div>
                  <div className="z-3 absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-b from-n-8/0 to-n-8/80 lg:p-15 pointer-events-none">
                    <h4 className="h4 -mb-6  text-n-3 font-grotesk">
                      Air Jordan 5 Retro
                    </h4>
                  </div>
                </div>

                <div className="relative gap-1 h-[20rem] bg-n-8 rounded-3xl overflow-hidden md:h-[25rem] border border-n-1/90 cursor-pointer">
                  <div
                    className="absolute inset-0 cursor-pointer"
                    onClick={() => {
                      navigate("/products/65e9f88f54986f2fc374d94a");
                    }}
                  >
                    <img
                      src={nike_air_force_1}
                      className="z-1 absolute w-full object-cover -translate-y-[13rem] xl:-translate-y-[15rem] hover:opacity-0 transition-opacity "
                      width={650}
                      height={400}
                      alt="Scary robot"
                    />

                    <img
                      src={nike_air_force_3}
                      className="z-1 h-full w-full  xl:h-auto object-cover opacity-1 transition-opacity "
                      width={520}
                      // height={400}
                      alt="Scary robot"
                    />
                  </div>

                  <div className="z-1 absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-b from-n-8/0 to-n-8/80 lg:p-15 pointer-events-none">
                    <h4 className="h4 -mb-6  text-n-3 font-grotesk">
                      Air Force 1 'Cactus Jack'
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
      <Section className="relative ">
        <div className="absolute right-0 left-0 top-16 container w-full bg-blue-300 h-20 overflow-hidden rotate-6 flex justify-between items-center h2 text-color-8">
          <h6>LIFESTYLE</h6>
          <h6>RUNNING</h6>
          <h6>TRAINING</h6>
          <h6>CASUAL</h6>
        </div>
        <div className="absolute right-0 left-0  top-5 container w-full bg-red-500 h-20 overflow-hidden -rotate-3  flex justify-between items-center h2 text-color-8"><h6>BASEBALL</h6>
          <h6>GYM </h6>
          <h6>WALKING</h6>
          <h6>GOLF</h6></div>
      </Section>
      <Section id="brands">
        <div className="container mt-5">
          <div className="h2 flex justify-between mb-10 ">
            <h2>BRANDS</h2>
            {/* <Button className=" bg-color-1 xl:hover:text-n-1">SEE ALL</Button> */}
          </div>
        </div>
        <div className=" hidden lg:block">
          <Slider slidesPerView={3} setLink={setLink} link={link}/>
        </div>

        <div className="lg:hidden xl:hidden">
          <Slider slidesPerView={1} />
        </div>
      </Section>
    </motion.div>
  );
};

export default Hero;
