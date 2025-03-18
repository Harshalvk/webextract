import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import Navbar from "@/components/landing/Navbar";
import { Spotlight } from "@/components/landing/Spotlight";
import { Separator } from "@/components/ui/separator";
import CTA from "@/components/landing/CTA";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Spotlight />
      <Hero />
      <Features />
      <CTA />
      <Separator className="container" />
      <Footer />
    </>
  );
}
