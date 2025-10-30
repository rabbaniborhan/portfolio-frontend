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
import { ArrowRight, BookOpen, Calendar, Clock, Eye } from "lucide-react";
import Link from "next/link";

// Use the same blogPosts data
const blogPosts = [
  {
    id: "1",
    title: "Mastering React Hooks: Best Practices and Patterns",
    excerpt:
      "Learn how to effectively use React Hooks in your projects with real-world examples and advanced patterns that will improve your code quality.",
    image: "/blog/react-hooks.jpg",
    author: "John Doe",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Frontend",
    tags: ["React", "JavaScript", "Hooks"],
    views: 1247,
    likes: 89,
    comments: 23,
    slug: "mastering-react-hooks",
  },
  {
    id: "2",
    title: "Building Scalable APIs with Node.js and Express",
    excerpt:
      "Discover the secrets to building robust and scalable RESTful APIs using Node.js and Express framework with proper error handling and security.",
    image: "/blog/node-apis.jpg",
    author: "John Doe",
    date: "2024-01-10",
    readTime: "12 min read",
    category: "Backend",
    tags: ["Node.js", "Express", "API", "Backend"],
    views: 892,
    likes: 67,
    comments: 15,
    slug: "building-scalable-apis",
  },
  {
    id: "3",
    title: "TypeScript Tips for React Developers",
    excerpt:
      "Level up your React development with these essential TypeScript patterns and tips that will make your code more type-safe and maintainable.",
    image: "/blog/typescript-react.jpg",
    author: "John Doe",
    date: "2024-01-05",
    readTime: "6 min read",
    category: "Frontend",
    tags: ["TypeScript", "React", "Frontend"],
    views: 1563,
    likes: 112,
    comments: 31,
    slug: "typescript-tips-react",
  },
];

export default function BlogPage() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <BookOpen className="h-12 w-12 mx-auto mb-4 text-primary" />
        <h1 className="text-4xl font-bold mb-4">Blog & Articles</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Thoughts, tutorials, and insights about web development, programming,
          and the latest technologies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <Card
            key={post.id}
            className="group hover:shadow-lg transition-all duration-300"
          >
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                <Badge variant="secondary">{post.category}</Badge>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </CardTitle>
              <CardDescription className="line-clamp-2">
                {post.excerpt}
              </CardDescription>
            </CardHeader>

            <CardContent className="pb-4">
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(post.date)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  <span>{post.views}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 2).map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {post.tags.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{post.tags.length - 2} more
                  </Badge>
                )}
              </div>
            </CardContent>

            <CardFooter>
              <Button
                variant="ghost"
                className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                asChild
              >
                <Link href={`/blog/${post.id}`}>
                  Read Article
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
