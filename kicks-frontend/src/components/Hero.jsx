import React, { useRef } from "react";
import Section from "./Section";
import { shoe_1, shoe_background, shoes_2 } from "../assets";
import { BackgroundCircles, BottomLine, Gradient } from "../design/Hero";
import { ScrollParallax } from "react-just-parallax";
import Button from "./Button";
const Hero = () => {
  const parallaxRef = useRef(null);
  return (
    <>
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
          <div className=" relative z-1 max-w-[62rem] mx-auto text-center mb-[4rem] lg:mb-[6rem] font-archivo">
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
                          className=" w-[9rem] "
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
          <h1 className="text-2xl lg:text-7xl xl:text-8xl mb-6 uppercase">
            Don't miss out
            <br />
            <span className=" inline-block text-right mx-auto w-full ">
              new drops
              <Button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 4.5 15 15m0 0V8.25m0 11.25H8.25"
                  />
                </svg>
              </Button>
            </span>
          </h1>
        </div>
      </Section>

      {/* <BottomLine /> */}
    </>
  );
};

export default Hero;
