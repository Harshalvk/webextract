"use client";

import React from "react";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const Hero = () => {
  return (
    <div className="container">
      <div className="flex justify-center mt-6">
        <Callout />
      </div>
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium text-center mt-6 tracking-tight">
        Extract <br className="block md:hidden" /> <span className="">Web</span>{" "}
        Data,
        <br />
        Effortlessly.
      </h1>
      <p className="text-center text-sm md:text-base text-white/50 mt-8 max-w-2xl mx-auto italic">
        Data extraction shouldn&apos;t slow you down. Our platform combines
        powerful scraping capabilities with an intuitive interface, keeping you
        in your workflow—without the complexity.
      </p>
    </div>
  );
};

function Callout() {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 100,
      }}
      className="inline-flex p-1 bg-zinc-900 border text-white rounded-full font-extralight text-xs md:text-sm items-center cursor-pointer hover:bg-zinc-950 group transition duration-500"
    >
      Revolutionizing Web Data Extraction
      <Separator orientation="vertical" className="mx-2" />
      <div className="bg-background group-hover:bg-muted size-6 rounded-full overflow-hidden duration-500">
        <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
          <span className="flex size-6">
            <ArrowRight className="m-auto size-3" />
          </span>
          <span className="flex size-6">
            <ArrowRight className="m-auto size-3" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default Hero;
