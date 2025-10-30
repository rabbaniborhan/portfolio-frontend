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
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  Calendar,
  Code,
  ExternalLink,
  Eye,
  Github,
  Heart,
  Search,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Mock projects data
const projects = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution with modern features and seamless user experience.",
    shortDescription: "Modern e-commerce platform with payment integration",
    image: "/projects/ecommerce-cover.jpg",
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Stripe",
      "Tailwind CSS",
    ],
    category: "fullstack",
    status: "completed",
    startDate: "2023-09-01",
    endDate: "2024-01-15",
    duration: "4.5 months",
    teamSize: 4,
    client: "Fashion Retail Co.",
    liveUrl: "https://ecommerce-demo.com",
    githubUrl: "https://github.com/johndoe/ecommerce-platform",
    featured: true,
    stats: {
      views: 1247,
      likes: 89,
      comments: 23,
    },
    slug: "ecommerce-platform",
  },
  {
    id: "2",
    title: "Task Management App",
    description:
      "A collaborative task management application for teams with real-time updates.",
    shortDescription: "Team collaboration and task management solution",
    image: "/projects/taskapp-cover.jpg",
    technologies: [
      "Vue.js",
      "Express",
      "MongoDB",
      "Socket.io",
      "AWS",
      "Tailwind CSS",
    ],
    category: "fullstack",
    status: "completed",
    startDate: "2023-06-01",
    endDate: "2023-08-31",
    duration: "3 months",
    teamSize: 2,
    client: "Internal Project",
    liveUrl: "https://taskapp-demo.com",
    githubUrl: "https://github.com/johndoe/task-management-app",
    featured: false,
    stats: {
      views: 892,
      likes: 67,
      comments: 15,
    },
    slug: "task-management-app",
  },
  {
    id: "3",
    title: "Weather Dashboard",
    description:
      "A beautiful weather application with real-time data and forecasts.",
    shortDescription: "Real-time weather data and forecasting app",
    image: "/projects/weather-cover.jpg",
    technologies: [
      "React",
      "TypeScript",
      "Chart.js",
      "OpenWeather API",
      "CSS3",
    ],
    category: "frontend",
    status: "completed",
    startDate: "2023-04-01",
    endDate: "2023-05-15",
    duration: "1.5 months",
    teamSize: 1,
    client: "Personal Project",
    liveUrl: "https://weather-demo.com",
    githubUrl: "https://github.com/johndoe/weather-dashboard",
    featured: true,
    stats: {
      views: 756,
      likes: 45,
      comments: 12,
    },
    slug: "weather-dashboard",
  },
  {
    id: "4",
    title: "REST API Service",
    description:
      "A scalable REST API service with authentication and documentation.",
    shortDescription: "Scalable backend API with comprehensive documentation",
    image: "/projects/api-cover.jpg",
    technologies: ["Node.js", "Express", "MongoDB", "JWT", "Swagger", "Docker"],
    category: "backend",
    status: "completed",
    startDate: "2023-03-01",
    endDate: "2023-04-30",
    duration: "2 months",
    teamSize: 1,
    client: "Startup Client",
    liveUrl: "https://api-demo.com",
    githubUrl: "https://github.com/johndoe/rest-api-service",
    featured: false,
    stats: {
      views: 634,
      likes: 38,
      comments: 8,
    },
    slug: "rest-api-service",
  },
  {
    id: "5",
    title: "Mobile Fitness App",
    description:
      "A cross-platform mobile application for fitness tracking and workouts.",
    shortDescription: "Fitness tracking and workout planning mobile app",
    image: "/projects/fitness-cover.jpg",
    technologies: ["React Native", "Firebase", "Redux", "Chart.js", "Expo"],
    category: "mobile",
    status: "in-progress",
    startDate: "2024-01-01",
    endDate: "2024-04-30",
    duration: "4 months",
    teamSize: 3,
    client: "Fitness Startup",
    liveUrl: null,
    githubUrl: "https://github.com/johndoe/fitness-app",
    featured: false,
    stats: {
      views: 523,
      likes: 29,
      comments: 6,
    },
    slug: "mobile-fitness-app",
  },
  {
    id: "6",
    title: "Portfolio Website",
    description:
      "A modern portfolio website with animations and responsive design.",
    shortDescription: "Modern portfolio with animations and responsive design",
    image: "/projects/portfolio-cover.jpg",
    technologies: [
      "Next.js",
      "TypeScript",
      "Framer Motion",
      "Tailwind CSS",
      "Vercel",
    ],
    category: "frontend",
    status: "completed",
    startDate: "2023-12-01",
    endDate: "2023-12-20",
    duration: "3 weeks",
    teamSize: 1,
    client: "Personal Project",
    liveUrl: "https://johndoe.dev",
    githubUrl: "https://github.com/johndoe/portfolio",
    featured: true,
    stats: {
      views: 987,
      likes: 72,
      comments: 18,
    },
    slug: "portfolio-website",
  },
];

const categories = [
  { id: "all", name: "All Projects", count: projects.length },
  {
    id: "fullstack",
    name: "Full Stack",
    count: projects.filter((p) => p.category === "fullstack").length,
  },
  {
    id: "frontend",
    name: "Frontend",
    count: projects.filter((p) => p.category === "frontend").length,
  },
  {
    id: "backend",
    name: "Backend",
    count: projects.filter((p) => p.category === "backend").length,
  },
  {
    id: "mobile",
    name: "Mobile",
    count: projects.filter((p) => p.category === "mobile").length,
  },
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFeatured, setShowFeatured] = useState(false);

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      activeCategory === "all" || project.category === activeCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((tech) =>
        tech.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesFeatured = !showFeatured || project.featured;

    return matchesCategory && matchesSearch && matchesFeatured;
  });

  const featuredProjects = projects.filter((project) => project.featured);
  const nonFeaturedProjects = filteredProjects.filter(
    (project) => !project.featured
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const getStatusColor = (status: string) => {
    const colors = {
      completed:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      "in-progress":
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      planned: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      fullstack:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      frontend: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      backend:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      mobile:
        "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
    };
    return (
      colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              <Code className="h-3 w-3 mr-1" />
              Portfolio
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">My Projects</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A collection of projects I've worked on, showcasing my skills and
              experience in web development, mobile apps, and full-stack
              solutions.
            </p>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between mb-6">
            {/* Search Bar */}
            <div className="relative w-full lg:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter Toggles */}
            <div className="flex gap-4">
              <Button
                variant={showFeatured ? "default" : "outline"}
                onClick={() => setShowFeatured(!showFeatured)}
                className="flex items-center gap-2"
              >
                <Sparkles className="h-4 w-4" />
                Featured Only
              </Button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                onClick={() => setActiveCategory(category.id)}
                className="rounded-full"
              >
                {category.name}
                <Badge variant="secondary" className="ml-2">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="h-6 w-6 text-yellow-500" />
              <h2 className="text-2xl font-bold">Featured Projects</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredProjects.map((project) => (
                <Card
                  key={project.id}
                  className="group hover:shadow-xl transition-all duration-300 border-2 border-yellow-200 dark:border-yellow-800"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(project.status)}>
                          {project.status.replace("-", " ")}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={getCategoryColor(project.category)}
                        >
                          {project.category}
                        </Badge>
                      </div>
                      <Sparkles className="h-5 w-5 text-yellow-500" />
                    </div>

                    <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {project.shortDescription}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pb-4">
                    {/* Project Image */}
                    <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-4" />

                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 4).map((tech, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.technologies.length - 4} more
                        </Badge>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{project.stats.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        <span>{project.stats.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(project.startDate)}</span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="flex justify-between">
                    <div className="flex gap-2">
                      {project.liveUrl && (
                        <Button variant="outline" size="sm" asChild>
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
                    </div>
                    <Button asChild>
                      <Link href={`/projects/${project.slug}`}>
                        View Details
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Projects Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              {activeCategory === "all"
                ? "All Projects"
                : categories.find((c) => c.id === activeCategory)?.name}
            </h2>
            <p className="text-muted-foreground">
              Showing {filteredProjects.length} of {projects.length} projects
            </p>
          </div>

          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nonFeaturedProjects.map((project) => (
                <Card
                  key={project.id}
                  className="group hover:shadow-lg transition-all duration-300"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className={getStatusColor(project.status)}>
                        {project.status.replace("-", " ")}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={getCategoryColor(project.category)}
                      >
                        {project.category}
                      </Badge>
                    </div>

                    <CardTitle className="group-hover:text-primary transition-colors line-clamp-1">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {project.shortDescription}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pb-4">
                    {/* Project Image */}
                    <div className="h-40 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-4" />

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.technologies.length - 3} more
                        </Badge>
                      )}
                    </div>

                    {/* Project Meta */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(project.startDate)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{project.stats.views}</span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="flex justify-between">
                    <div className="flex gap-2">
                      {project.liveUrl && (
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/projects/${project.slug}`}>
                        Details
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            /* No Results State */
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No projects found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filter to find what you're looking
                for.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                  setShowFeatured(false);
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-none max-w-2xl mx-auto">
            <CardContent className="py-8">
              <Code className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-bold mb-2">
                Interested in Working Together?
              </h3>
              <p className="text-muted-foreground mb-6">
                Have a project in mind? Let's discuss how we can bring your
                ideas to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/#contact">Start a Project</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/#about">Learn More About Me</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
