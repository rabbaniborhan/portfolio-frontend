"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Cloud,
  Code,
  Cpu,
  Database,
  Server,
  Smartphone,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function SkillsSection() {
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const ProgressBar = ({
    level,
    color,
    bgColor,
    delay = 0,
  }: {
    level: number;
    color: string;
    bgColor: string;
    delay?: number;
  }) => (
    <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
      <div
        className={`h-3 rounded-full ${bgColor} transition-all duration-1000 ease-out`}
        style={{
          width: isVisible ? `${level}%` : "0%",
          transitionDelay: `${delay}ms`,
        }}
      />
    </div>
  );

  return (
    <section
      id="skills"
      className="py-20 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
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
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {skills.map((category, categoryIndex) => (
            <Card
              key={category.category}
              className="group hover:shadow-lg transition-all duration-300"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-xl ${category.bgColor}/10`}>
                    <category.icon className={`h-6 w-6 ${category.color}`} />
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
                      <span className="font-medium text-sm">{skill.name}</span>
                      <span className="text-muted-foreground text-sm">
                        {skill.level}%
                      </span>
                    </div>
                    <ProgressBar
                      level={skill.level}
                      color={category.color}
                      bgColor={category.bgColor}
                      delay={categoryIndex * 100 + skillIndex * 50}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Skills */}
        <div className="mt-12">
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
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="px-3 py-2 text-sm hover:scale-105 transition-transform cursor-default"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
                <Cpu className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-2xl font-bold">15+</p>
              <p className="text-sm text-muted-foreground">Technologies</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
                <Code className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <p className="text-2xl font-bold">50+</p>
              <p className="text-sm text-muted-foreground">Projects</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
                <Database className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <p className="text-2xl font-bold">3+</p>
              <p className="text-sm text-muted-foreground">Years Exp</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-3">
                <Cloud className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <p className="text-2xl font-bold">25+</p>
              <p className="text-sm text-muted-foreground">Clients</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
