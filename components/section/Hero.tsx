"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { AppWindow, ChevronDown, Database, Globe } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-10 lg:px-16 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0  backdrop-opacity-100 "
        style={{
          backgroundImage: "url('/hero.svg')",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-[#0284c7] to-blue-700  opacity-20 mix-blend-overlay" />

      <div className="flex flex-col-reverse md:flex-row items-center  justify-between">
        {/* content -section */}
        <div className="relative w-full md:w-1/2 z-10 flex-1 text-center md:text-left space-y-6 ">
          <motion.p
            className="text-sm hidden md:flex uppercase tracking-widest"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Crafting Digital Experiences
          </motion.p>

          <motion.h1
            className="text-3xl md:text-5xl lg:text-6xl font-bold mt-10 leading-tight"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            Hi, I’m <span className="text-cyan-500 ">Borhan Rabbani</span>
          </motion.h1>

          <motion.p
            className=" max-w-xl text-sm md:text-base mr-2 text-foreground"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            A Full Stack Developer passionate about crafting modern, scalable,
            and beautiful web experiences.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 mt-6 justify-center md:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Button
              size="lg"
              onClick={() => scrollToSection("projects")}
              className="bg-cyan-500 text-sm md:text-base text-white hover:bg-cyan-600 transition-all duration-300"
            >
              View My Work
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection("contact")}
              className="hover:text-cyan-500 text-sm md:text-base text-foreground transition-all duration-300"
            >
              Get In Touch
            </Button>
          </motion.div>
        </div>

        {/* Image Section */}
        <div className="w-full border-b border-cyan-400 md:w-1/2 flex justify-end">
          <motion.div
            className="relative z-10 flex-1 flex  justify-between mt-10 md:mt-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-white xl:mt-10">
              <div className=" mt-16 md:mt-20 leading-4 md:px-2 lg:px-3 text-sm lg:text-base flex items-center  gap-2 md:gap-4 bg-cyan-500 px-4 py-1 rounded-full">
                <span className=" p-2  bg-cyan-700 rounded-full">
                  <Globe />
                </span>
                Web Development
              </div>
              <div className=" mt-4 md:mt-8 leading-4 md:px-2 lg:px-3 lg:text-base  text-sm  flex items-center  gap-2 md:gap-4 bg-cyan-500 px-4 py-1 rounded-full">
                <span className=" p-2  bg-cyan-700 rounded-full">
                  <AppWindow />
                </span>
                Front-end Development
              </div>
              <div className=" mt-4 md:mt-8  leading-4 md:px-2 lg:px-3 lg:text-base   text-sm  flex items-center  gap-2  bg-cyan-500 px-4 py-1 rounded-full">
                <span className=" p-2  bg-cyan-700 rounded-full">
                  <Database />
                </span>
                MERN Stack
              </div>
            </div>

            <Image
              src="/Gemini.png" // replace with your image
              alt="Borhan Rabbani"
              width={420}
              height={480}
              className="object-contain md:object-scale-down w-64 sm:w-80 md:w-[380px] lg:w-[420px]"
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Icon */}
      <div className="absolute bottom-8 md:left-2/3 lg:left-1/2 hidden md:flex  transform -translate-x-1/2 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => scrollToSection("about")}
          className="text-white bg-cyan-500 hover:bg-cyan-600 animate-bounce"
        >
          <ChevronDown className="h-6 w-6" />
        </Button>
      </div>
    </section>
  );
}
