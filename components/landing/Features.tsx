import { BrainCog, DatabaseZap, Workflow } from "lucide-react";
import React from "react";
import { TextEffect } from "../motion-primitives/text-effect";

const content = [
  {
    title: "Effortless Data Extraction",
    description:
      "Extract web data seamlessly with a no-code, intuitive UI. Automate and export structured data in minutes.",
    icon: DatabaseZap,
  },
  {
    title: "Automate Your Workflow",
    description:
      "Schedule extractions and let automation handle your data updates in real-time or on your set schedule.",
    icon: Workflow,
  },
  {
    title: "Smart AI-Powered Extraction",
    description:
      "Use AI to detect patterns and extract structured data effortlessly, even from complex web pages.",
    icon: BrainCog,
  },
];

const Features = () => {
  return (
    <section className="my-6 container">
      <TextEffect
        preset="fade-in-blur"
        className="text-center text-3xl md:text-4xl lg:text-5xl"
      >
        Features
      </TextEffect>
      <div className="w-full grid gap-2 md:grid-cols-3 my-6">
        {content.map((c) => (
          <div className="flex flex-col items-center text-center border mx-2 p-4 rounded-lg shadow-sm hover:shadow-md transition">
            <c.icon className="w-10 h-10 text-primary mb-2" />
            <h2 className="text-lg font-semibold">{c.title}</h2>
            <p className="text-sm text-muted-foreground">{c.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
