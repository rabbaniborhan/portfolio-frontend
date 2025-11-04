"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Project } from "@/types";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export const projects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description:
      "Full-stack e-commerce solution with product filtering, cart, and Stripe payment integration.",
    image: "/project1.jpg",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    category: "frontend",
    githubUrl: "https://github.com/borhanrabbani/ecommerce",
    liveUrl: "https://ecommerce-demo.vercel.app",
    slug: "ecommerce-platform",
  },
  {
    id: "2",
    title: "Portfolio Dashboard",
    description:
      "Dynamic portfolio CMS built with Next.js and Tailwind, featuring an admin dashboard and live preview.",
    image: "/project2.jpg",
    technologies: ["Next.js", "Redux", "TailwindCSS", "Ant Design"],
    category: "frontend",
    githubUrl: "https://github.com/borhanrabbani/portfolio-dashboard",
    liveUrl: "https://borhan.dev",
    slug: "portfolio-dashboard",
  },
  {
    id: "3",
    title: "Real-time Chat App",
    description:
      "A real-time messaging app using Socket.io, with chat rooms, typing indicators, and JWT authentication.",
    image: "/project3.jpg",
    technologies: ["React", "Node.js", "Socket.io", "JWT"],
    category: "backend",
    githubUrl: "https://github.com/borhanrabbani/chat-app",
    liveUrl: "https://chatify-demo.vercel.app",
    slug: "realtime-chat-app",
  },
  {
    id: "4",
    title: "AI Blog Writer",
    description:
      "AI-powered SaaS tool that generates blog posts using OpenAI API, with a clean dashboard for managing content.",
    image: "/project4.jpg",
    technologies: ["Next.js", "OpenAI API", "MongoDB", "TailwindCSS"],
    category: "app",
    githubUrl: "https://github.com/borhanrabbani/ai-blog",
    liveUrl: "https://aibloggen.vercel.app",
    slug: "ai-blog-writer",
  },
  {
    id: "5",
    title: "Task Tracker CLI",
    description:
      "A Node.js CLI tool for managing tasks directly from the terminal — lightweight and fast.",
    image: "/project5.jpg",
    technologies: ["Node.js", "Inquirer", "Chalk"],
    category: "others",
    githubUrl: "https://github.com/borhanrabbani/task-cli",
    slug: "task-tracker-cli",
  },
];

const categories = ["all", "frontend", "backend", "app", "others"] as const;

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<
    "all" | "frontend" | "backend" | "app" | "others"
  >("all");

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <section id="projects" className="pt-20 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading Animation */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and
            experience.
          </p>
        </motion.div>

        {/* Filter Buttons Animation */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.slice(0, 3).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.03 }}
              viewport={{ once: true }}
            >
              <Card className="flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300">
                {/* Project Image */}
                <div className="relative w-full h-48 bg-gray-200 dark:bg-gray-800">
                  <img
                    src={project.image || "/placeholder-image.jpg"}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Card Content */}
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-grow">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
                  {project.githubUrl && (
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </a>
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button size="sm" asChild>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* More Button Animation */}
        <motion.div
          className="flex items-center justify-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Button
            variant="outline"
            className="hover:bg-cyan-500 hover:text-white transition-all duration-300"
          >
            <Link href={"/projects"}>MORE...</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
