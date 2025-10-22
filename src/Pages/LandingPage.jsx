import BentoGrid from "@/Components/BentroGrid";
import { FeedBack } from "@/Components/FeedBack";
import Footer from "@/Components/Footer";
import Hero from "@/Components/Hero";
import Navbar from "@/Components/Navbar";

import React from "react";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <div id="features">
        <BentoGrid />
      </div>
      <FeedBack />
      <Footer />
    </div>
  );
};

export default LandingPage;
