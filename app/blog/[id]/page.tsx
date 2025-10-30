import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowLeft,
  Bookmark,
  Calendar,
  ChevronRight,
  Clock,
  Copy,
  Eye,
  Facebook,
  Heart,
  Linkedin,
  MessageCircle,
  Share2,
  Tag,
  Twitter,
  User,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Mock data - replace with actual API call
const blogPosts = [
  {
    id: "1",
    title: "Mastering React Hooks: Best Practices and Patterns",
    excerpt:
      "Learn how to effectively use React Hooks in your projects with real-world examples and advanced patterns that will improve your code quality.",
    content: `
      <h2>Introduction to React Hooks</h2>
      <p>React Hooks have revolutionized the way we write React components. They allow us to use state and other React features without writing a class, making our code more readable and maintainable.</p>

      <h3>Why Hooks?</h3>
      <p>Before Hooks, React developers faced several challenges:</p>
      <ul>
        <li>Hard to reuse stateful logic between components</li>
        <li>Complex components became hard to understand</li>
        <li>Classes confused both people and machines</li>
      </ul>

      <h2>Essential Hooks Every Developer Should Know</h2>

      <h3>1. useState Hook</h3>
      <p>The <code>useState</code> hook is the most fundamental hook that allows functional components to have state.</p>
      
      <pre><code>const [count, setCount] = useState(0);</code></pre>

      <h3>2. useEffect Hook</h3>
      <p>The <code>useEffect</code> hook lets you perform side effects in function components. It serves the same purpose as <code>componentDidMount</code>, <code>componentDidUpdate</code>, and <code>componentWillUnmount</code> in React classes.</p>

      <pre><code>useEffect(() => {
  document.title = \`You clicked \${count} times\`;
}, [count]);</code></pre>

      <h3>3. Custom Hooks</h3>
      <p>Custom Hooks let you extract component logic into reusable functions. This is one of the most powerful features of Hooks.</p>

      <pre><code>function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}</code></pre>

      <h2>Best Practices</h2>

      <h3>1. Only Call Hooks at the Top Level</h3>
      <p>Don't call Hooks inside loops, conditions, or nested functions. This ensures that Hooks are called in the same order each time a component renders.</p>

      <h3>2. Only Call Hooks from React Functions</h3>
      <p>Call Hooks from React function components or custom Hooks, not regular JavaScript functions.</p>

      <h3>3. Use the ESLint Plugin</h3>
      <p>The <code>eslint-plugin-react-hooks</code> package enforces these rules automatically. It's included by default in Create React App.</p>

      <h2>Advanced Patterns</h2>

      <h3>1. UseReducer for Complex State</h3>
      <p>When you have complex state logic that involves multiple sub-values or when the next state depends on the previous one, <code>useReducer</code> is usually preferable over <code>useState</code>.</p>

      <h3>2. Context with UseReducer</h3>
      <p>Combine <code>useReducer</code> with <code>useContext</code> for global state management without external libraries.</p>

      <h2>Conclusion</h2>
      <p>React Hooks have made React development more enjoyable and efficient. By following best practices and understanding the patterns, you can write cleaner, more maintainable code. Remember to always use the ESLint plugin and keep learning about new Hook patterns as they emerge.</p>
    `,
    image: "/blog/react-hooks.jpg",
    author: "John Doe",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Frontend",
    tags: ["React", "JavaScript", "Hooks", "Web Development", "Best Practices"],
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
    content: "Full content for API article...",
    image: "/blog/node-apis.jpg",
    author: "John Doe",
    date: "2024-01-10",
    readTime: "12 min read",
    category: "Backend",
    tags: ["Node.js", "Express", "API", "Backend", "REST"],
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
    content: "Full content for TypeScript article...",
    image: "/blog/typescript-react.jpg",
    author: "John Doe",
    date: "2024-01-05",
    readTime: "6 min read",
    category: "Frontend",
    tags: ["TypeScript", "React", "Frontend", "JavaScript"],
    views: 1563,
    likes: 112,
    comments: 31,
    slug: "typescript-tips-react",
  },
];

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const postId = (await params).id;
  const post = blogPosts.find((p) => p.id === postId);

  if (!post) {
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

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `Check out this article: ${post.title}`;

  const shareLinks = [
    {
      icon: Twitter,
      name: "Twitter",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        shareText
      )}&url=${encodeURIComponent(shareUrl)}`,
      color: "hover:bg-blue-50 hover:text-blue-600",
    },
    {
      icon: Facebook,
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}`,
      color: "hover:bg-blue-50 hover:text-blue-600",
    },
    {
      icon: Linkedin,
      name: "LinkedIn",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        shareUrl
      )}`,
      color: "hover:bg-blue-50 hover:text-blue-600",
    },
  ];

  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/blog">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{post.views}</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                <span>{post.likes}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                <span>{post.comments}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <article className="mb-12">
            {/* Category and Read Time */}
            <div className="flex items-center justify-between mb-6">
              <Badge variant="secondary">{post.category}</Badge>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(post.date)}</span>
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Author and Meta */}
            <div className="flex items-center justify-between py-6 border-y">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold">{post.author}</p>
                  <p className="text-sm text-muted-foreground">
                    Full Stack Developer
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Bookmark className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Featured Image */}
            <div className="my-8">
              <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl" />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="flex items-center gap-1"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Article Content */}
            <div
              className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-code:bg-muted prose-code:px-1 prose-code:rounded prose-pre:bg-muted"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Article Footer */}
            <div className="border-t mt-12 pt-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Written by {post.author}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Published on {formatDate(post.date)}
                  </p>
                </div>

                {/* Share Buttons */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground mr-2">
                    Share:
                  </span>
                  {shareLinks.map((social, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                      asChild
                    >
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={social.color}
                      >
                        <social.icon className="h-4 w-4" />
                        <span className="sr-only">Share on {social.name}</span>
                      </a>
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                  >
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copy link</span>
                  </Button>
                </div>
              </div>
            </div>
          </article>

          {/* Engagement Section */}
          <Card className="mb-12">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <h3 className="text-lg font-semibold mb-2">
                    Enjoyed this article?
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Your engagement helps others discover this content.
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    Like ({post.likes})
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    Comment ({post.comments})
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Related Articles</h2>
                <Link href="/blog">
                  <Button variant="ghost" className="flex items-center gap-2">
                    View All
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Card
                    key={relatedPost.id}
                    className="group hover:shadow-lg transition-all duration-300"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                        <Badge variant="secondary">
                          {relatedPost.category}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{relatedPost.readTime}</span>
                        </div>
                      </div>

                      <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                        {relatedPost.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="pb-4">
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(relatedPost.date)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          <span>{relatedPost.views}</span>
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter>
                      <Button variant="ghost" className="w-full" asChild>
                        <Link href={`/blog/${relatedPost.slug}`}>
                          Read More
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Newsletter Signup */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-none">
            <CardContent className="py-8 text-center">
              <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Get the latest articles on web development, programming tips,
                and industry insights delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg border border-input bg-background"
                />
                <Button>Subscribe</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

// Generate static params for SSG
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const postId = (await params).id;
  const post = blogPosts.find((p) => p.id === postId);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: `${post.title} | John Doe Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [post.image],
    },
  };
}
