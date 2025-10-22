import React from "react";
import { Button } from "./ui/button";
import Testimonials from "./Testimonials";

const Hero = () => {
  return (
    <section className="relative z-20 flex min-h-screen flex-col items-center justify-center   gap-10  text-center">
      <h1 className="font-dm-sans font-medium text-4xl leading-tight tracking-[-2px] md:max-w-4xl md:text-6xl">
        <span className="relative inline-block mr-2">
          <span className="relative z-10 text-black">Restaurant-POS</span>
          <span className="absolute inset-0 top-1/2 -z-10 -translate-y-1/2 -rotate-1 transform rounded-md bg-blue-200 py-6 md:py-8"></span>
        </span>
        <span className="relative inline-block">
          <span className="relative z-10 text-black">Software made</span>
        </span>
        <br />
        <span className="relative inline-block mr-2">
          <span className="relative z-10 text-black">Simple with</span>
        </span>
        <span className="relative inline-block">
          <span className="relative z-10 text-black">Bistro!</span>
          <span className="absolute inset-0 top-1/2 -z-10 -translate-y-1/2 -rotate-1 transform rounded-md bg-yellow-200 py-6 md:py-8"></span>
        </span>
      </h1>
      <p className="max-w-md text-gray-700 md:max-w-xl md:text-lg">
        Create and customize a user-friendly menu, manage tables, and set
        pricing — all from one simple platform.
      </p>

      <Button
        className="bg-gray-800 text-white transform transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95 shadow-lg"
        size="lg"
      >
        Create your menu
      </Button>

      {/* Testimonials Section */}
      <div className="">
        <Testimonials />
      </div>
    </section>
  );
};

export default Hero;
