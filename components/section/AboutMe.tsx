"use client";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

const personalInfo = [
  { icon: MapPin, label: "Location", value: "San Francisco, CA" },
  { icon: Mail, label: "Email", value: "hello@johndoe.dev" },
  { icon: Calendar, label: "Birthday", value: "March 15, 1995" },
  { icon: Briefcase, label: "Freelance", value: "Available" },
];

const stats = [
  { number: "50+", label: "Projects Completed", icon: Code },
  { number: "3+", label: "Years Experience", icon: Award },
  { number: "25+", label: "Happy Clients", icon: Users },
  { number: "15+", label: "Technologies", icon: BookOpen },
];

export default function AboutMe() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="space-y-8"
    >
      {" "}
      <div className="flex items-center gap-3">
        {" "}
        <div className="p-2 bg-cyan-100 dark:bg-cyan-900 rounded-lg">
          {" "}
          <Target className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />{" "}
        </div>{" "}
        <h3 className="text-2xl font-bold">About Me</h3>{" "}
      </div>{" "}
      {/* Personal Info & Stats */}{" "}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {" "}
        {/* Personal Info Card */}{" "}
        <Card>
          {" "}
          <CardContent className="pt-6">
            {" "}
            <h4 className="font-semibold text-lg mb-4">
              {" "}
              Personal Information{" "}
            </h4>{" "}
            <div className="space-y-4">
              {" "}
              {personalInfo.map((info, index) => (
                <div key={index} className="flex items-center space-x-3">
                  {" "}
                  <info.icon className="h-4 w-4 text-muted-foreground shrink-0" />{" "}
                  <div className="flex-1">
                    {" "}
                    <p className="text-sm text-muted-foreground">
                      {" "}
                      {info.label}{" "}
                    </p>{" "}
                    <p className="font-medium">{info.value}</p>{" "}
                  </div>{" "}
                </div>
              ))}{" "}
            </div>{" "}
            <Button className="w-full mt-6">
              {" "}
              <a
                href="/resume.pdf"
                download
                className=" flex items-center gap-0.5"
              >
                {" "}
                <Download className="h-4 w-4 mr-2" /> Download CV{" "}
              </a>{" "}
            </Button>{" "}
          </CardContent>{" "}
        </Card>{" "}
        {/* Stats Card */}{" "}
        <Card>
          {" "}
          <CardContent className="pt-6">
            {" "}
            <h4 className="font-semibold text-lg mb-4">At a Glance</h4>{" "}
            <div className="grid grid-cols-2 gap-4">
              {" "}
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 bg-muted/50 rounded-lg"
                >
                  {" "}
                  <stat.icon className="h-6 w-6 mx-auto mb-2 text-primary" />{" "}
                  <p className="text-2xl font-bold">{stat.number}</p>{" "}
                  <p className="text-sm text-muted-foreground">
                    {" "}
                    {stat.label}{" "}
                  </p>{" "}
                </div>
              ))}{" "}
            </div>{" "}
          </CardContent>{" "}
        </Card>{" "}
      </div>{" "}
      {/* About Text */}{" "}
      <Card>
        {" "}
        <CardContent className="pt-6">
          {" "}
          <div className="space-y-4 text-muted-foreground">
            {" "}
            <p>
              {" "}
              Hello! I'm John Doe, a passionate full-stack developer with over 3
              years of experience in creating digital experiences. My journey in
              web development started during my computer science studies, and
              I've been hooked ever since.{" "}
            </p>{" "}
            <p>
              {" "}
              I specialize in modern JavaScript frameworks like React and
              Next.js for frontend development, and Node.js with various
              databases for backend solutions. I'm passionate about writing
              clean, maintainable code and creating user-friendly applications
              that solve real-world problems.{" "}
            </p>{" "}
            <p>
              {" "}
              What drives me is the opportunity to transform complex challenges
              into elegant, efficient solutions. I believe in continuous
              learning and staying updated with the latest technologies and best
              practices in the ever-evolving web development landscape.{" "}
            </p>{" "}
          </div>{" "}
        </CardContent>{" "}
      </Card>{" "}
    </motion.div>
  );
}
