"use client";
import { useEffect, useState } from "react";

export const Hero = () => {
  const [animationReady, setAnimationReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimationReady(true);
    }, 100);
  }, []);

  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center xl:gap-16 snap-start pr-0"
    >
      {/* Blobs */}
      <div className="absolute top-10 left-10 w-40 h-40 lg:w-60 lg:h-60 blob-gradient-1 rounded-full blur-2xl"></div>
      <div className="absolute top-1/4 right-20 w-32 h-32 lg:w-48 lg:h-48 blob-gradient-2 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-24 h-24 lg:w-36 lg:h-36 blob-gradient-3 rounded-full blur-2xl"></div>
      <div className="absolute bottom-10 right-10 w-36 h-36 lg:w-52 lg:h-52 blob-gradient-1 rounded-full blur-3xl"></div>

      <div className="flex flex-col lg:flex-row gap-12 xl:gap-20 items-center">
        <div className="relative w-full">
          <h1
            className={`flex lg:flex-col justify-center sm:justify-start gap-2 lg:gap-6 text-xl lg:text-4xl font-playfair text-accent-50 relative ${
              animationReady
                ? "animate-slide-right"
                : "opacity-0 transform -translate-x-[-100px]"
            }`}
          >
            <span className="ml-4">Joanne</span>
            <span>Bazin</span>
          </h1>
        </div>

        <div className="relative">
          <div
            className={`hidden lg:block w-[2px] h-40 bg-accent-50 ${
              animationReady
                ? "animate-vertical-line"
                : "opacity-0 transform translate-y-[-100px] rotate-15"
            }`}
          ></div>
          <div
            className={`lg:hidden h-[2px] w-36 bg-accent-50 ${
              animationReady
                ? "animate-horizontal-line"
                : "opacity-0 transform -translate-x-[100px]"
            }`}
          ></div>
        </div>

        <div className="relative">
          <h2
            className={`flex flex-col items-center sm:items-end lg:items-start text-2xl sm:text-4xl lg:text-5xl sm:ml-6 font-playfair relative ${
              animationReady
                ? "animate-slide-left"
                : "opacity-0 transform -translate-x-[100px]"
            }`}
          >
            <span className="uppercase mb-8 lg:mb-12 lg:ml-6 sm:mr-10">
              Développeuse
            </span>
            <span className="uppercase">Web</span>
          </h2>
        </div>
      </div>
    </section>
  );
};
