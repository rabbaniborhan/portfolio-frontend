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
import { ArrowRight, BookOpen, Calendar, Clock } from "lucide-react";

export function BlogSection() {
  const blogPosts = [
    {
      id: "1",
      title: "Mastering React Hooks: Best Practices",
      excerpt:
        "Learn how to effectively use React Hooks in your projects with real-world examples and patterns.",
      date: "2024-01-15",
      readTime: "8 min read",
      category: "Frontend",
      slug: "mastering-react-hooks",
      gradient: "from-blue-500 to-purple-600",
    },
    {
      id: "2",
      title: "Building Scalable APIs with Node.js",
      excerpt:
        "Discover how to build robust and scalable RESTful APIs using Node.js and Express framework.",
      date: "2024-01-10",
      readTime: "12 min read",
      category: "Backend",
      slug: "building-scalable-apis",
      gradient: "from-green-500 to-blue-600",
    },
    {
      id: "3",
      title: "TypeScript Tips for React Developers",
      excerpt:
        "Level up your React development with these essential TypeScript patterns and tips.",
      date: "2024-01-05",
      readTime: "6 min read",
      category: "Frontend",
      slug: "typescript-tips-react",
      gradient: "from-orange-500 to-red-600",
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <section id="blog" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Latest Blog Posts
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Thoughts, tutorials, and insights about web development and
            programming.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <Card
              key={post.id}
              className="group hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              {/* Thumbnail Placeholder */}
              <div
                className={`relative h-48 w-full bg-gradient-to-br ${post.gradient} rounded-t-lg overflow-hidden`}
              >
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                <div className="absolute top-4 left-4">
                  <Badge
                    variant="secondary"
                    className="bg-white/90 backdrop-blur-sm"
                  >
                    {post.category}
                  </Badge>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <BookOpen className="h-8 w-8 text-white/80" />
                </div>
              </div>

              <CardHeader className="pb-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </CardTitle>
                <CardDescription className="mt-2 line-clamp-3">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>

              <CardFooter>
                <Button
                  variant="ghost"
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  asChild
                >
                  <a href={`/blog/${post.slug}`}>
                    Read More
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-muted/50 border-none max-w-2xl mx-auto">
            <CardContent className="py-8">
              <BookOpen className="h-8 w-8 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">Want to read more?</h3>
              <p className="text-muted-foreground mb-6">
                Check out all my articles on web development and programming.
              </p>
              <Button asChild>
                <a href="/blog">View All Posts</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
