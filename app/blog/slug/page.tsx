"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";

export default function BlogPostDetailsPage() {
  const params = useParams();
  const slug = params.slug as string;
  const router = useRouter();

  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/blog/slug/${slug}`);
        if (res.data.success) {
          setPost(res.data.post);
        } else {
          router.push("/blog");
        }
      } catch (err) {
        console.error(err);
        router.push("/blog");
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchBlogPost();
  }, [slug, router]);

  if (loading) {
    return (
      <div style={{ paddingTop: "120px", textAlign: "center", minHeight: "80vh" }}>
        <p>Loading blog content...</p>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div style={{ paddingTop: "100px", paddingBottom: "60px", minHeight: "80vh" }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        <Link href="/blog" style={{ color: "var(--ac)", fontSize: "14px", fontWeight: "bold", display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "24px" }}>
          ← Back to Blog
        </Link>

        <article>
          <div style={{ display: "flex", justifyContent: "space-between", color: "var(--tx3)", fontSize: "13px", marginBottom: "16px" }}>
            <span>Category: {post.categories?.join(", ") || "General"}</span>
            <span>Published: {new Date(post.createdAt).toLocaleDateString()}</span>
          </div>

          <h1 style={{ fontSize: "36px", fontWeight: 700, lineHeight: 1.25, marginBottom: "20px" }}>
            {post.title}
          </h1>

          <div style={{ display: "flex", gap: "10px", margin: "24px 0", borderTop: "1px solid var(--bd)", borderBottom: "1px solid var(--bd)", padding: "12px 0", fontSize: "13px", color: "var(--tx2)" }}>
            <span>By {post.author}</span>
            <span>•</span>
            <span>⏱ {post.readTime || "5 min read"}</span>
          </div>

          {post.bannerImage && (
            <div style={{ width: "100%", height: "360px", background: "var(--sf)", borderRadius: "12px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "32px" }}>
              <img src={post.bannerImage} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          )}

          <div
            className="blog-content"
            style={{ fontSize: "16px", color: "var(--tx2)", lineHeight: 1.8 }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </div>
  );
}
