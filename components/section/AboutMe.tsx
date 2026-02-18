"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Award,
  BookOpen,
  Briefcase,
  Calendar,
  Code,
  Download,
  Mail,
  MapPin,
  Target,
  Users,
} from "lucide-react";
import { useRef } from "react";

const personalInfo = [
  { icon: MapPin, label: "Location", value: "Rajshahi, BD" },
  { icon: Mail, label: "Email", value: "brborhan70@gmail.com" },
  { icon: Calendar, label: "Birthday", value: "September 25, 2001" },
  { icon: Briefcase, label: "Freelance", value: "Available" },
];

const stats = [
  { number: "30+", label: "Projects Completed", icon: Code },
  { number: "2.5+", label: "Years Experience", icon: Award },
  { number: "20+", label: "Happy Clients", icon: Users },
  { number: "20+", label: "Technologies", icon: BookOpen },
];

export default function AboutMe() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });

  // subtle parallax effect
  const y = useTransform(scrollYProgress, [0, 1], [60, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <motion.div ref={ref} style={{ y, opacity }} className="space-y-12">
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-cyan-100 dark:bg-cyan-900 rounded-lg">
          <Target className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
        </div>
        <h3 className="text-3xl font-bold">About Me</h3>
      </div>

      {/* Cards Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
        className="grid grid-cols-1 md:grid-cols-2 gap-10"
      >
        {/* Personal Info */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6 }}
        >
          <Card className="hover:shadow-xl transition-shadow duration-500">
            <CardContent className="pt-6">
              <h4 className="font-semibold text-lg mb-6">
                Personal Information
              </h4>

              <div className="space-y-4">
                {personalInfo.map((info, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <info.icon className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {info.label}
                      </p>
                      <p className="font-medium">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button className="w-full mt-8">
                <a
                  href="/resume.pdf"
                  download
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download CV
                </a>
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6 }}
        >
          <Card className="hover:shadow-xl transition-shadow duration-500">
            <CardContent className="pt-6">
              <h4 className="font-semibold text-lg mb-6">At a Glance</h4>

              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-4 bg-muted/40 rounded-xl transition-all"
                  >
                    <stat.icon className="h-6 w-6 mx-auto mb-3 text-primary" />
                    <p className="text-3xl font-bold">{stat.number}</p>
                    <p className="text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* About Text Card */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Card className="hover:shadow-2xl transition-shadow duration-500">
          <CardContent className="pt-6 space-y-6 text-muted-foreground leading-relaxed">
            <p>
              Hello! I'm Borhan, a passionate Full Stack Developer focused on
              building scalable, high-performance web applications and digital
              products.
            </p>
            <p>
              I specialize in the MERN stack, Next.js, and modern backend
              architectures, crafting clean, maintainable systems that are built
              to grow.
            </p>
            <p>
              I transform complex ideas into production-ready solutions and
              continuously explore AI-driven development, DevOps, and emerging
              technologies to stay ahead.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
