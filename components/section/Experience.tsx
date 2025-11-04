"use client";

import { motion } from "framer-motion";

import {
  Award,
  Briefcase,
  Building,
  ChevronRight,
  Clock,
  Star,
  Target,
  Users,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";

const experiences = [
  {
    company: "TechCorp Inc.",
    position: "Senior Full Stack Developer",
    duration: "2022 - Present",
    description: [
      "Lead development of customer-facing web applications using React and Node.js",
      "Mentored 3 junior developers and conducted code reviews",
      "Improved application performance by 40% through optimization techniques",
      "Collaborated with UX team to implement responsive designs",
    ],
    technologies: ["React", "Node.js", "TypeScript", "MongoDB", "AWS"],
    type: "full-time",
  },
  {
    company: "StartupXYZ",
    position: "Full Stack Developer",
    duration: "2020 - 2022",
    description: [
      "Developed and maintained multiple client projects using modern web technologies",
      "Implemented RESTful APIs and integrated third-party services",
      "Worked closely with clients to gather requirements and deliver solutions",
      "Participated in agile development processes and sprint planning",
    ],
    technologies: ["Vue.js", "Express", "PostgreSQL", "Docker", "Firebase"],
    type: "full-time",
  },
  {
    company: "Freelance",
    position: "Web Developer",
    duration: "2019 - 2020",
    description: [
      "Built custom websites and web applications for various clients",
      "Specialized in e-commerce solutions and portfolio websites",
      "Managed project timelines and client communications",
      "Provided ongoing maintenance and support services",
    ],
    technologies: ["JavaScript", "PHP", "WordPress", "CSS3", "HTML5"],
    type: "freelance",
  },
];

export default function Experience() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true }}
      className="space-y-8"
    >
      <div className="flex items-center gap-3">
        {" "}
        <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
          {" "}
          <Briefcase className="h-6 w-6 text-green-600 dark:text-green-400" />{" "}
        </div>{" "}
        <h3 className="text-2xl font-bold">Work Experience</h3>{" "}
      </div>{" "}
      <div className="space-y-6">
        {" "}
        {experiences.map((exp, index) => (
          <Card
            key={index}
            className="group hover:shadow-lg transition-all duration-300"
          >
            {" "}
            <CardContent className="pt-6">
              {" "}
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                {" "}
                <div className="flex-1">
                  {" "}
                  <div className="flex items-center gap-3 mb-2">
                    {" "}
                    <div className="p-2 bg-primary/10 rounded-lg">
                      {" "}
                      <Building className="h-5 w-5 text-primary" />{" "}
                    </div>{" "}
                    <div>
                      {" "}
                      <h4 className="text-xl font-bold">
                        {" "}
                        {exp.position}{" "}
                      </h4>{" "}
                      <p className="text-primary font-semibold">
                        {" "}
                        {exp.company}{" "}
                      </p>{" "}
                    </div>{" "}
                  </div>{" "}
                  <div className="flex items-center gap-2 text-muted-foreground">
                    {" "}
                    <Clock className="h-4 w-4" /> <span>{exp.duration}</span>{" "}
                    <Badge variant="outline" className="ml-2">
                      {" "}
                      {exp.type}{" "}
                    </Badge>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
              <div className="mb-4">
                {" "}
                <h5 className="font-semibold mb-2">
                  {" "}
                  Key Responsibilities:{" "}
                </h5>{" "}
                <ul className="space-y-2">
                  {" "}
                  {exp.description.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-muted-foreground"
                    >
                      {" "}
                      <ChevronRight className="h-4 w-4 text-primary mt-1 flex-shrink-0" />{" "}
                      <span>{item}</span>{" "}
                    </li>
                  ))}{" "}
                </ul>{" "}
              </div>{" "}
              <div>
                {" "}
                <h5 className="font-semibold mb-2">Technologies Used:</h5>{" "}
                <div className="flex flex-wrap gap-2">
                  {" "}
                  {exp.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary">
                      {" "}
                      {tech}{" "}
                    </Badge>
                  ))}{" "}
                </div>{" "}
              </div>{" "}
            </CardContent>{" "}
          </Card>
        ))}{" "}
      </div>{" "}
      {/* Career Highlights */}{" "}
      <Card>
        {" "}
        <CardContent className="pt-6">
          {" "}
          <h4 className="font-semibold text-lg mb-6 text-center">
            {" "}
            Career Highlights{" "}
          </h4>{" "}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {" "}
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              {" "}
              <div className="w-12 h-12 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mx-auto mb-3">
                {" "}
                <Star className="h-6 w-6 text-green-600 dark:text-green-400" />{" "}
              </div>{" "}
              <h5 className="font-semibold mb-2">
                {" "}
                40% Performance Improvement{" "}
              </h5>{" "}
              <p className="text-sm text-muted-foreground">
                {" "}
                Optimized application performance at TechCorp{" "}
              </p>{" "}
            </div>{" "}
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              {" "}
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-3">
                {" "}
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />{" "}
              </div>{" "}
              <h5 className="font-semibold mb-2">Team Leadership</h5>{" "}
              <p className="text-sm text-muted-foreground">
                {" "}
                Mentored 3 junior developers to senior roles{" "}
              </p>{" "}
            </div>{" "}
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              {" "}
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center mx-auto mb-3">
                {" "}
                <Award className="h-6 w-6 text-purple-600 dark:text-purple-400" />{" "}
              </div>{" "}
              <h5 className="font-semibold mb-2">Project Delivery</h5>{" "}
              <p className="text-sm text-muted-foreground">
                {" "}
                Successfully delivered 50+ projects on time{" "}
              </p>{" "}
            </div>{" "}
            <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              {" "}
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-800 rounded-full flex items-center justify-center mx-auto mb-3">
                {" "}
                <Target className="h-6 w-6 text-orange-600 dark:text-orange-400" />{" "}
              </div>{" "}
              <h5 className="font-semibold mb-2">Client Satisfaction</h5>{" "}
              <p className="text-sm text-muted-foreground">
                {" "}
                Maintained 100% client satisfaction rate{" "}
              </p>{" "}
            </div>{" "}
          </div>{" "}
        </CardContent>{" "}
      </Card>{" "}
    </motion.div>
  );
}
