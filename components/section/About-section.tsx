"use client";

import { Badge } from "@/components/ui/badge";
import { motion, useScroll, useTransform } from "framer-motion";
import { Award } from "lucide-react";
import { useRef } from "react";
import AboutMe from "./AboutMe";
import EducationAndCertifications from "./EducationAndCertification";
import Experience from "./Experience";

export default function AboutSection() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax movement
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section id="about" ref={ref} className="pt-32 relative">
      <div className="container mx-auto px-4">
        {/* Animated Header */}
        <motion.div style={{ y }} className="text-center mb-20">
          <Badge
            variant="secondary"
            className="mb-4 p-2 bg-green-50 dark:bg-green-900/20"
          >
            <Award className="h-4 w-4 mr-1" /> About Me
          </Badge>

          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            My Professional Journey
          </h2>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Passionate full-stack developer with 2.5+ years of experience
            creating digital solutions that make a difference.
          </p>
        </motion.div>

        {/* Content Sections */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.25,
              },
            },
          }}
          className="max-w-5xl mx-auto space-y-24"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 60 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6 }}
          >
            <AboutMe />
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 60 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6 }}
          >
            <Experience />
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 60 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6 }}
          >
            <EducationAndCertifications />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
