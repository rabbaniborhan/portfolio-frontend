"use client";

import { motion } from "framer-motion";
import { Calendar, GraduationCap } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
const education = [
  {
    year: "2022 – Present",
    degree: "Bachelor of Science (Honours) in Mathematics",
    institution: "National University, Bangladesh",
    grade: "Running",
    description:
      "Studying core mathematics including Algebra, Calculus, Real Analysis, and Statistics. Developing strong analytical and problem-solving skills applicable to software engineering and data-driven systems.",
    achievements: [
      "Active learner in problem-solving and competitive programming",
      "Applied mathematical concepts in programming and web development",
      "Self-learning advanced technologies alongside academic studies",
    ],
  },
  {
    year: "2018 – 2020",
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Science Group",
    grade: "GPA: 4.58/5.00",
    description:
      "Completed higher secondary education with a focus on Mathematics, Physics, and ICT, building a strong foundation for technical and analytical fields.",
    achievements: [
      "Strong academic performance in Mathematics",
      "Active participation in academic activities",
    ],
  },
];

const certifications = [
  { title: "Figma Design System", org: "GP Academy", year: "2026" },
  {
    title: "Advanced Backend Software Engineering",
    org: "Pocket shool ",
    year: "2025",
  },
  {
    title: "Coding Fundamentals & Logic Building A-Z",
    org: "Pocket School",
    year: "2025",
  },

  { title: "Web Development", org: "Programming Hero", year: "2022" },
];

export default function EducationAndCertifications() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="space-y-6"
    >
      {" "}
      <div className="flex items-center gap-3">
        {" "}
        <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
          {" "}
          <GraduationCap className="h-6 w-6 text-purple-600 dark:text-purple-400" />{" "}
        </div>{" "}
        <h3 className="text-2xl font-bold">Education & Qualifications</h3>{" "}
      </div>{" "}
      <div className="space-y-6">
        {" "}
        {education.map((edu, index) => (
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
                      <GraduationCap className="h-5 w-5 text-primary" />{" "}
                    </div>{" "}
                    <div>
                      {" "}
                      <h4 className="text-xl font-bold">{edu.degree}</h4>{" "}
                      <p className="text-primary font-semibold">
                        {" "}
                        {edu.institution}{" "}
                      </p>{" "}
                    </div>{" "}
                  </div>{" "}
                  <div className="flex items-center gap-4 text-muted-foreground mb-3">
                    {" "}
                    <div className="flex items-center gap-2">
                      {" "}
                      <Calendar className="h-4 w-4" />{" "}
                      <span>{edu.year}</span>{" "}
                    </div>{" "}
                    <Badge variant="secondary">{edu.grade}</Badge>{" "}
                  </div>{" "}
                  <p className="text-muted-foreground mb-4">
                    {" "}
                    {edu.description}{" "}
                  </p>{" "}
                </div>{" "}
              </div>{" "}
              <div>
                {" "}
                <h5 className="font-semibold mb-2">Key Achievements:</h5>{" "}
                <div className="flex flex-wrap gap-2">
                  {" "}
                  {edu.achievements.map((achievement, achievementIndex) => (
                    <Badge
                      key={achievementIndex}
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300"
                    >
                      {" "}
                      {achievement}{" "}
                    </Badge>
                  ))}{" "}
                </div>{" "}
              </div>{" "}
            </CardContent>{" "}
          </Card>
        ))}{" "}
      </div>{" "}
      {/* Certifications */} {/* Certifications */}
      <Card>
        <CardContent className="pt-6">
          <h4 className="font-semibold text-lg mb-6 text-center">
            Certifications & Courses
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
              >
                <div>
                  <p className="font-medium">{cert.title}</p>
                  <p className="text-sm text-muted-foreground">{cert.org}</p>
                </div>
                <Badge variant="secondary">{cert.year}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
