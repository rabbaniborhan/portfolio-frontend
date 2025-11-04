"use client";

import { motion } from "framer-motion";
import { Calendar, GraduationCap } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";

const education = [
  {
    year: "2018-2020",
    degree: "Master of Science in Computer Science",
    institution: "Stanford University",
    grade: "GPA: 3.8/4.0",
    description:
      "Specialized in Web Technologies and Distributed Systems. Thesis on 'Optimizing React Applications for Performance'.",
    achievements: [
      "Graduated with Honors",
      "Research Assistant",
      "ACM Chapter President",
    ],
  },
  {
    year: "2014-2018",
    degree: "Bachelor of Science in Software Engineering",
    institution: "MIT",
    grade: "GPA: 3.9/4.0",
    description:
      "Focus on Software Development Methodologies and Database Systems. Minor in Business Administration.",
    achievements: [
      "Summa Cum Laude",
      "Dean's List All Semesters",
      "Hackathon Winner 2017",
    ],
  },
];

const certifications = [
  { title: "AWS Certified Developer", org: "Amazon", year: "2023" },
  { title: "React Advanced Patterns", org: "Frontend Masters", year: "2022" },
  { title: "Node.js Microservices", org: "Pluralsight", year: "2022" },
  { title: "TypeScript Mastery", org: "Total TypeScript", year: "2021" },
];

export default function EducationAndCertifications() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="space-y-8"
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
                      <Calendar className="h-4 w-4" /> <span>{edu.year}</span>{" "}
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
      {/* Certifications */}{" "}
      <Card>
        {" "}
        <CardContent className="pt-6">
          {" "}
          <h4 className="font-semibold text-lg mb-6 text-center">
            {" "}
            Certifications & Courses{" "}
          </h4>{" "}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {" "}
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              {" "}
              <div>
                {" "}
                <p className="font-medium">AWS Certified Developer</p>{" "}
                <p className="text-sm text-muted-foreground">
                  {" "}
                  Amazon Web Services{" "}
                </p>{" "}
              </div>{" "}
              <Badge variant="secondary">2023</Badge>{" "}
            </div>{" "}
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              {" "}
              <div>
                {" "}
                <p className="font-medium">React Advanced Patterns</p>{" "}
                <p className="text-sm text-muted-foreground">
                  {" "}
                  Frontend Masters{" "}
                </p>{" "}
              </div>{" "}
              <Badge variant="secondary">2022</Badge>{" "}
            </div>{" "}
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              {" "}
              <div>
                {" "}
                <p className="font-medium">Node.js Microservices</p>{" "}
                <p className="text-sm text-muted-foreground"> Pluralsight </p>{" "}
              </div>{" "}
              <Badge variant="secondary">2022</Badge>{" "}
            </div>{" "}
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              {" "}
              <div>
                {" "}
                <p className="font-medium">TypeScript Mastery</p>{" "}
                <p className="text-sm text-muted-foreground">
                  {" "}
                  Total TypeScript{" "}
                </p>{" "}
              </div>{" "}
              <Badge variant="secondary">2021</Badge>{" "}
            </div>{" "}
          </div>{" "}
        </CardContent>{" "}
      </Card>{" "}
    </motion.div>
  );
}
