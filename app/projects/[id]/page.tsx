import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  ChevronRight,
  Clock,
  Code,
  ExternalLink,
  Eye,
  Github,
  Heart,
  Lightbulb,
  MessageCircle,
  Target,
  Users,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Mock data - replace with actual API call
const projects = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution with modern features and seamless user experience.",
    fullDescription:
      "A comprehensive e-commerce platform built with modern technologies. This project includes user authentication, product management, shopping cart, payment integration, and admin dashboard. The platform is optimized for performance and provides an excellent user experience across all devices.",
    image: "/projects/ecommerce-cover.jpg",
    images: [
      "/projects/ecommerce-1.jpg",
      "/projects/ecommerce-2.jpg",
      "/projects/ecommerce-3.jpg",
      "/projects/ecommerce-4.jpg",
    ],
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
    features: [
      "User authentication and authorization",
      "Product catalog with advanced filtering",
      "Shopping cart and wishlist functionality",
      "Secure payment processing with Stripe",
      "Order tracking and management",
      "Admin dashboard for inventory management",
      "Responsive design for all devices",
      "SEO optimization",
    ],
    challenges: [
      "Implementing real-time inventory updates",
      "Optimizing performance for large product catalogs",
      "Ensuring secure payment processing",
      "Creating an intuitive admin interface",
    ],
    solutions: [
      "Used WebSocket for real-time updates",
      "Implemented lazy loading and image optimization",
      "Integrated Stripe with proper error handling",
      "Designed a user-friendly admin dashboard with React Admin",
    ],
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
    description: "A collaborative task management application for teams.",
    fullDescription:
      "A modern task management application designed to help teams collaborate effectively. Features include real-time updates, drag-and-drop functionality, file attachments, and team communication tools.",
    image: "/projects/taskapp-cover.jpg",
    images: ["/projects/taskapp-1.jpg", "/projects/taskapp-2.jpg"],
    technologies: ["Vue.js", "Express", "MongoDB", "Socket.io", "AWS"],
    category: "fullstack",
    status: "completed",
    startDate: "2023-06-01",
    endDate: "2023-08-31",
    duration: "3 months",
    teamSize: 2,
    client: "Internal Project",
    liveUrl: "https://taskapp-demo.com",
    githubUrl: "https://github.com/johndoe/task-management-app",
    features: [
      "Real-time collaboration",
      "Drag and drop interface",
      "File attachments",
      "Team chat",
      "Progress tracking",
    ],
    challenges: [
      "Real-time synchronization",
      "File upload and storage",
      "User permissions",
    ],
    solutions: [
      "Used Socket.io for real-time features",
      "Implemented AWS S3 for file storage",
      "Created role-based access control",
    ],
    stats: {
      views: 892,
      likes: 67,
      comments: 15,
    },
    slug: "task-management-app",
  },
];

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const ProjectId = (await params).id;
  const project = projects.find((p) => p.id === ProjectId);

  if (!project) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/#projects">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Projects
              </Button>
            </Link>
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
                <MessageCircle className="h-4 w-4" />
                <span>{project.stats.comments}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Project Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Badge variant="secondary" className="mb-4">
              {project.category.charAt(0).toUpperCase() +
                project.category.slice(1)}{" "}
              Project
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {project.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              {project.fullDescription}
            </p>

            <div className="flex flex-wrap gap-4 mb-6">
              {project.liveUrl && (
                <Button asChild>
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
                <Button variant="outline" asChild>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    View Code
                  </a>
                </Button>
              )}
            </div>

            {/* Project Meta */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Calendar className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-semibold">{project.duration}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Users className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Team Size</p>
                  <p className="font-semibold">{project.teamSize} people</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Code className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-semibold capitalize">{project.status}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Clock className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="font-semibold">{formatDate(project.endDate)}</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Project Image */}
          <div className="lg:col-span-1">
            <Card className="overflow-hidden">
              <div className="aspect-square bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg" />
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Technologies Used */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Technologies Used</h2>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="px-3 py-2 text-sm"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Key Features */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  Key Features
                </h2>
                <ul className="space-y-3">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Project Gallery */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Project Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.images.map((image, index) => (
                    <div
                      key={index}
                      className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-lg"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Challenges & Solutions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Target className="h-6 w-6 text-orange-500" />
                    Challenges
                  </h2>
                  <ul className="space-y-2">
                    {project.challenges.map((challenge, index) => (
                      <li key={index} className="text-muted-foreground">
                        • {challenge}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Lightbulb className="h-6 w-6 text-yellow-500" />
                    Solutions
                  </h2>
                  <ul className="space-y-2">
                    {project.solutions.map((solution, index) => (
                      <li key={index} className="text-muted-foreground">
                        • {solution}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Info */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-4">
                  Project Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Client</p>
                    <p className="font-medium">{project.client}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Start Date</p>
                    <p className="font-medium">
                      {formatDate(project.startDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">End Date</p>
                    <p className="font-medium">{formatDate(project.endDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Category</p>
                    <p className="font-medium capitalize">{project.category}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Technology Stack */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-4">Tech Stack</h3>
                <div className="space-y-3">
                  {project.technologies.map((tech, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 border-b last:border-b-0"
                    >
                      <span className="text-sm">{tech}</span>
                      <Badge variant="outline" className="text-xs">
                        Used
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-none">
              <CardContent className="pt-6 text-center">
                <h3 className="font-semibold text-lg mb-2">
                  Like this project?
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Let's work together on your next project.
                </p>
                <Button asChild className="w-full">
                  <Link href="/#contact">Start a Project</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t">
          <Button variant="outline" asChild>
            <Link href="/#projects">
              <ArrowLeft className="h-4 w-4 mr-2" />
              All Projects
            </Link>
          </Button>

          <div className="flex gap-4">
            <Button variant="outline" size="sm">
              <Heart className="h-4 w-4 mr-2" />
              Like Project
            </Button>
            <Button variant="outline" size="sm">
              <MessageCircle className="h-4 w-4 mr-2" />
              Comment
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

// Generate static params for SSG
export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const ProjectId = (await params).id;
  const project = projects.find((p) => p.id === ProjectId);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }

  return {
    title: `${project.title} | John Doe Portfolio`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      images: [project.image],
    },
  };
}
