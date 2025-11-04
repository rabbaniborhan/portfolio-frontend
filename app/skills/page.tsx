"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import { Cloud, Code, Server, Smartphone, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function SkillsPage() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const skills = [
    {
      category: "Frontend",
      icon: Code,
      color: "text-blue-500",
      bgColor: "bg-blue-500",
      skills: [
        { name: "React", level: 95 },
        { name: "Next.js", level: 90 },
        { name: "TypeScript", level: 88 },
        { name: "Tailwind CSS", level: 92 },
        { name: "Vue.js", level: 80 },
      ],
    },
    {
      category: "Backend",
      icon: Server,
      color: "text-green-500",
      bgColor: "bg-green-500",
      skills: [
        { name: "Node.js", level: 90 },
        { name: "Express", level: 88 },
        { name: "Python", level: 85 },
        { name: "PostgreSQL", level: 82 },
        { name: "MongoDB", level: 85 },
      ],
    },
    {
      category: "Mobile",
      icon: Smartphone,
      color: "text-purple-500",
      bgColor: "bg-purple-500",
      skills: [
        { name: "React Native", level: 85 },
        { name: "Flutter", level: 70 },
        { name: "iOS Development", level: 65 },
      ],
    },
    {
      category: "DevOps",
      icon: Cloud,
      color: "text-orange-500",
      bgColor: "bg-orange-500",
      skills: [
        { name: "Docker", level: 80 },
        { name: "AWS", level: 75 },
        { name: "CI/CD", level: 78 },
        { name: "Linux", level: 85 },
      ],
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  const ProgressBar = ({
    level,
    bgColor,
    delay = 0,
  }: {
    level: number;
    bgColor: string;
    delay?: number;
  }) => (
    <motion.div
      className="w-full bg-muted rounded-full h-3 overflow-hidden"
      initial={{ width: 0 }}
      animate={{ width: isVisible ? `${level}%` : 0 }}
      transition={{ duration: 1, delay: delay / 1000 }}
    >
      <div className={`h-3 rounded-full ${bgColor}`} />
    </motion.div>
  );

  return (
    <section id="skills" className="py-10 relative" ref={sectionRef}>
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{ backgroundImage: "url('/hero.svg')" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Badge variant="secondary" className="mb-4 inline-flex items-center">
            <Zap className="h-3 w-3 mr-1" />
            Technical Skills
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Skills & Expertise
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Here's a comprehensive overview of my technical skills and
            proficiency levels across different technologies.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          <AnimatePresence>
            {skills.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-xl ${category.bgColor}/10`}>
                        <category.icon
                          className={`h-6 w-6 ${category.color}`}
                        />
                      </div>
                      <div>
                        <CardTitle className="text-xl">
                          {category.category}
                        </CardTitle>
                        <CardDescription>
                          {category.skills.length} skills
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skill.name} className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-sm">
                            {skill.name}
                          </span>
                          <span className="text-muted-foreground text-sm">
                            {skill.level}%
                          </span>
                        </div>
                        <ProgressBar
                          level={skill.level}
                          bgColor={category.bgColor}
                          delay={categoryIndex * 100 + skillIndex * 50}
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Additional Skills */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Additional Technologies</CardTitle>
              <CardDescription>
                Other tools and technologies I work with
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  "Git",
                  "GitHub",
                  "Figma",
                  "Jest",
                  "Cypress",
                  "Webpack",
                  "Vite",
                  "Redis",
                  "GraphQL",
                  "REST APIs",
                  "JWT",
                  "OAuth",
                  "WebSockets",
                  "Nginx",
                  "PM2",
                  "Jira",
                  "Slack",
                  "VS Code",
                  "Postman",
                ].map((tech, index) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <Badge
                      variant="secondary"
                      className="px-3 py-2 text-sm cursor-default"
                    >
                      {tech}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
