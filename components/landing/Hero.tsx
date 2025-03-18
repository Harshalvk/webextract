"use client";

import React from "react";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { BorderTrail } from "../motion-primitives/border-trail";
import { Button } from "../ui/button";
import { AnimatedGroup } from "../motion-primitives/animated-group";
import { TextEffect } from "../motion-primitives/text-effect";

const transitionVariant = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 2,
      },
    },
  },
};

const Hero = () => {
  return (
    <div className="container">
      <div>
        <div className="flex justify-center mt-6">
          <Callout />
        </div>
        <AnimatedGroup
          variants={{
            container: {},
            item: {},
          }}
          preset="blur-slide"
          className="duration-700"
        >
          <TextEffect
            preset="fade-in-blur"
            speedReveal={1.1}
            speedSegment={0.2}
            className="text-5xl md:text-7xl lg:text-8xl max-w-5xl mx-auto font-medium text-center mt-6 tracking-tight"
          >
            Extract Web Data, Effortlessly.
          </TextEffect>
          <AnimatedGroup
            variants={transitionVariant}
            className="text-center text-sm md:text-base text-white/50 mt-6 max-w-2xl mx-auto italic"
          >
            Data extraction shouldn&apos;t slow you down. Our platform combines
            powerful scraping capabilities with an intuitive interface, keeping
            you in your workflow—without the complexity.
          </AnimatedGroup>
        </AnimatedGroup>
        <AnimatedGroup variants={transitionVariant}>
          <div className="w-full flex items-center justify-center gap-3">
            <Button className="bg-white/90 hover:bg-white transition duration-500 my-6 rounded-full">
              Start here
            </Button>
            <Button
              className="border-black my-6 rounded-full"
              variant={"ghost"}
            >
              Request a demo
            </Button>
          </div>
        </AnimatedGroup>
      </div>
      <AnimatedGroup variants={transitionVariant}>
        <div className="relative rounded-xl overflow-hidden my-6">
          <Image
            src={"/ss.png"}
            alt="product screenshot"
            width={2000}
            height={2000}
            className="w-full rounded-xl border"
          />
          <BorderTrail
            style={{
              boxShadow:
                "0px 0px 60px 30px rgb(255 255 255 / 50%), 0 0 100px 60px rgb(0 0 0 / 50%), 0 0 140px 90px rgb(0 0 0 / 50%)",
            }}
            size={200}
          />
          <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-zinc-950 to-transparent z-20" />
        </div>
      </AnimatedGroup>
    </div>
  );
};

function Callout() {
  return (
    <AnimatedGroup variants={transitionVariant}>
      <div className="inline-flex p-1 bg-zinc-900 border text-white rounded-full font-extralight text-xs md:text-sm items-center cursor-pointer hover:bg-zinc-950 group transition duration-500">
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
      </div>
    </AnimatedGroup>
  );
}

export default Hero;
