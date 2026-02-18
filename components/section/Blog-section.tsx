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
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, BookOpen, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

export function BlogSection() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });

  // subtle section parallax
  const y = useTransform(scrollYProgress, [0, 1], [60, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

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
    <section id="blog" ref={ref} className="pt-32">
      <motion.div style={{ y, opacity }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Latest Blog Posts
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Thoughts, tutorials, and insights about web development.
            </p>
          </motion.div>

          {/* Blog Posts Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.25,
                },
              },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-16"
          >
            {blogPosts.map((post) => (
              <motion.div
                key={post.id}
                variants={{
                  hidden: { opacity: 0, y: 60, scale: 0.95 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                transition={{ duration: 0.7 }}
                whileHover={{ y: -8 }}
              >
                <Card className="group hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  {/* Thumbnail */}
                  <div
                    className={`relative h-48 w-full bg-gradient-to-br ${post.gradient}`}
                  >
                    <div className="absolute top-4 left-4">
                      <Badge
                        variant="secondary"
                        className="bg-white/90 backdrop-blur-sm"
                      >
                        {post.category}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <div className="flex justify-between text-sm text-muted-foreground mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(post.date)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </div>
                    </div>

                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>

                    <CardDescription>{post.excerpt}</CardDescription>
                  </CardHeader>

                  <CardFooter>
                    <Button
                      variant="ghost"
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      asChild
                    >
                      <Link href={`/blog/${post.slug}`}>
                        Read More
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Card className="bg-muted/40 border-none max-w-2xl mx-auto hover:shadow-xl transition-shadow duration-500">
              <CardContent className="py-10">
                <BookOpen className="h-8 w-8 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold mb-3">Want to read more?</h3>
                <p className="text-muted-foreground mb-6">
                  Explore all my articles about modern web development.
                </p>
                <Button asChild>
                  <Link href="/blog">View All Posts</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
