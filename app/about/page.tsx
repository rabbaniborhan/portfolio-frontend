"use client";

import AboutMe from "@/components/section/AboutMe";
import EducationAndCertifications from "@/components/section/EducationAndCertification";
import Experience from "@/components/section/Experience";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Award } from "lucide-react";

export default function AboutPage() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4">
            <Award className="h-4 w-4 mr-1" /> About Me
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My Professional Journey
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Passionate full-stack developer with 3+ years of experience creating
            digital solutions that make a difference.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-20">
          <AboutMe />
          <Experience />
          <EducationAndCertifications />
        </div>
      </div>
    </section>
  );
}
