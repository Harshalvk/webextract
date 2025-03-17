import Hero from "@/components/landing/Hero";
import Navbar from "@/components/landing/Navbar";
import { Spotlight } from "@/components/landing/Spotlight";

import React from "react";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Spotlight />
      <Hero />
    </>
  );
}
