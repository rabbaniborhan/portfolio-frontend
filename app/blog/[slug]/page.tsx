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
  const [reactions, setReactions] = useState({ likes: 0, loves: 0, claps: 0 });
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Comment Form state
  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
  const [commentSuccess, setCommentSuccess] = useState(false);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/blog/slug/${slug}`);
        if (res.data.success) {
          setPost(res.data.post);
          setReactions(res.data.post.reactions || { likes: 0, loves: 0, claps: 0 });
          setComments(res.data.post.comments || []);
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

  const handleReact = async (type: "likes" | "loves" | "claps") => {
    if (!post) return;
    try {
      setReactions((prev) => ({ ...prev, [type]: prev[type] + 1 }));
      const res = await api.post(`/blog/${post._id}/react`, { type });
      if (res.data.success && res.data.reactions) {
        setReactions(res.data.reactions);
      }
    } catch (err) {
      console.error("React error:", err);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post || !commentName.trim() || !commentText.trim()) return;

    setSubmittingComment(true);
    try {
      const res = await api.post(`/blog/${post._id}/comment`, {
        name: commentName.trim(),
        comment: commentText.trim(),
      });
      if (res.data.success && res.data.comments) {
        setComments(res.data.comments);
        setCommentName("");
        setCommentText("");
        setCommentSuccess(true);
        setTimeout(() => setCommentSuccess(false), 3000);
      }
    } catch (err) {
      console.error("Comment submit error:", err);
    } finally {
      setSubmittingComment(false);
    }
  };

  if (loading) {
    return (
      <div style={{ paddingTop: "140px", textAlign: "center", minHeight: "80vh" }}>
        <div style={{ display: "inline-block", width: "40px", height: "40px", border: "3px solid rgba(0,184,219,0.2)", borderTopColor: "var(--ac)", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
        <p style={{ marginTop: "16px", color: "var(--tx2)", fontSize: "15px" }}>Loading article content...</p>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div style={{ paddingTop: "120px", paddingBottom: "80px", minHeight: "80vh" }}>
      <div className="container" style={{ maxWidth: "860px" }}>
        {/* Navigation back button */}
        <Link
          href="/blog"
          style={{
            color: "var(--ac)",
            fontSize: "14px",
            fontWeight: "700",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "32px",
            textDecoration: "none",
            background: "rgba(0,184,219,0.08)",
            padding: "8px 16px",
            borderRadius: "100px",
            border: "1px solid rgba(0,184,219,0.2)",
            transition: "all 0.2s ease",
          }}
        >
          ← Back to Articles
        </Link>

        <article>
          {/* Categories / Tags badges */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px", alignItems: "center" }}>
            {post.categories?.map((cat: string) => (
              <span
                key={cat}
                style={{
                  fontSize: "12px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: "var(--ac)",
                  background: "rgba(0,184,219,0.1)",
                  border: "1px solid rgba(0,184,219,0.25)",
                  padding: "4px 12px",
                  borderRadius: "100px",
                }}
              >
                {cat}
              </span>
            ))}

            {/* Views Count Badge */}
            <span
              style={{
                fontSize: "12px",
                fontWeight: "700",
                color: "var(--tx2)",
                background: "var(--sf)",
                border: "1px solid var(--bd)",
                padding: "4px 12px",
                borderRadius: "100px",
                marginLeft: "auto",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px"
              }}
            >
              👁️ {post.viewsCount || 1} Views
            </span>
          </div>

          {/* Article Title */}
          <h1
            style={{
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 800,
              lineHeight: 1.25,
              marginBottom: "24px",
              color: "var(--tx)",
              letterSpacing: "-0.02em",
            }}
          >
            {post.title}
          </h1>

          {/* Author Meta Info Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "16px",
              margin: "24px 0 36px",
              borderTop: "1px solid var(--bd)",
              borderBottom: "1px solid var(--bd)",
              padding: "16px 0",
              fontSize: "14px",
              color: "var(--tx2)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--ac), #006a7e)",
                  color: "#fff",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px",
                }}
              >
                {post.author ? post.author[0] : "B"}
              </div>
              <div>
                <div style={{ fontWeight: "700", color: "var(--tx)", fontSize: "14px" }}>
                  {post.author || "Software Developer"}
                </div>
                <div style={{ fontSize: "12px", color: "var(--tx3)" }}>
                  {new Date(post.createdAt || Date.now()).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "13px" }}>
              <span
                style={{
                  background: "var(--sf2)",
                  padding: "6px 14px",
                  borderRadius: "100px",
                  border: "1px solid var(--bd)",
                  color: "var(--tx)",
                  fontWeight: "600",
                }}
              >
                ⏱ {post.readTime || "5 min read"}
              </span>
            </div>
          </div>

          {/* Hero Banner Thumbnail Image */}
          {post.bannerImage && (
            <div
              style={{
                width: "100%",
                maxHeight: "440px",
                background: "var(--bg2)",
                borderRadius: "var(--rl)",
                overflow: "hidden",
                border: "1px solid var(--bd)",
                marginBottom: "40px",
                boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
              }}
            >
              <img
                src={post.bannerImage}
                alt={post.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          )}

          {/* Article Body Content */}
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
            style={{ marginBottom: "48px" }}
          />

          {/* ═══ REACTION & LIKES BAR ═══ */}
          <div
            style={{
              background: "var(--bg2)",
              border: "1px solid var(--bd)",
              borderRadius: "16px",
              padding: "24px",
              marginBottom: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "16px"
            }}
          >
            <div>
              <h3 style={{ fontSize: "16px", fontWeight: "bold", color: "var(--tx)", marginBottom: "4px" }}>
                Did you find this article helpful?
              </h3>
              <p style={{ fontSize: "13px", color: "var(--tx3)" }}>
                Leave a reaction or clap to support the author!
              </p>
            </div>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <button
                onClick={() => handleReact("likes")}
                style={{
                  padding: "8px 16px",
                  borderRadius: "20px",
                  background: "rgba(56,189,248,0.1)",
                  border: "1px solid rgba(56,189,248,0.3)",
                  color: "#38bdf8",
                  fontWeight: "bold",
                  fontSize: "13px",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  transition: "all 0.2s"
                }}
              >
                👍 Like <span style={{ background: "rgba(56,189,248,0.2)", padding: "2px 8px", borderRadius: "10px", fontSize: "11px" }}>{reactions.likes}</span>
              </button>

              <button
                onClick={() => handleReact("loves")}
                style={{
                  padding: "8px 16px",
                  borderRadius: "20px",
                  background: "rgba(244,63,94,0.1)",
                  border: "1px solid rgba(244,63,94,0.3)",
                  color: "#f43f5e",
                  fontWeight: "bold",
                  fontSize: "13px",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  transition: "all 0.2s"
                }}
              >
                ❤️ Love <span style={{ background: "rgba(244,63,94,0.2)", padding: "2px 8px", borderRadius: "10px", fontSize: "11px" }}>{reactions.loves}</span>
              </button>

              <button
                onClick={() => handleReact("claps")}
                style={{
                  padding: "8px 16px",
                  borderRadius: "20px",
                  background: "rgba(251,191,36,0.1)",
                  border: "1px solid rgba(251,191,36,0.3)",
                  color: "#fbbf24",
                  fontWeight: "bold",
                  fontSize: "13px",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  transition: "all 0.2s"
                }}
              >
                👏 Clap <span style={{ background: "rgba(251,191,36,0.2)", padding: "2px 8px", borderRadius: "10px", fontSize: "11px" }}>{reactions.claps}</span>
              </button>
            </div>
          </div>

          {/* ═══ COMMENTS SECTION ═══ */}
          <section style={{ borderTop: "1px solid var(--bd)", paddingTop: "40px" }}>
            <h3 style={{ fontSize: "22px", fontWeight: 800, color: "var(--tx)", marginBottom: "24px" }}>
              Discussion ({comments.length})
            </h3>

            {/* Comment Form */}
            <form onSubmit={handleAddComment} style={{ background: "var(--bg2)", border: "1px solid var(--bd)", borderRadius: "16px", padding: "24px", marginBottom: "40px" }}>
              <h4 style={{ fontSize: "15px", fontWeight: "bold", color: "var(--tx)", marginBottom: "16px" }}>
                Leave a Comment
              </h4>

              {commentSuccess && (
                <div style={{ padding: "10px 14px", borderRadius: "8px", background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)", color: "#22c55e", fontSize: "13px", marginBottom: "16px" }}>
                  ✅ Comment posted successfully!
                </div>
              )}

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", color: "var(--tx2)", marginBottom: "6px" }}>Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. Alex Johnson"
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    background: "var(--sf)",
                    border: "1px solid var(--bd)",
                    color: "var(--tx)",
                    fontSize: "14px",
                    outline: "none"
                  }}
                />
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", color: "var(--tx2)", marginBottom: "6px" }}>Comment</label>
                <textarea
                  placeholder="Share your thoughts or questions on this article..."
                  rows={4}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    background: "var(--sf)",
                    border: "1px solid var(--bd)",
                    color: "var(--tx)",
                    fontSize: "14px",
                    outline: "none",
                    resize: "vertical"
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={submittingComment}
                style={{
                  padding: "10px 24px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, var(--ac), #0096b8)",
                  color: "#ffffff",
                  fontWeight: "bold",
                  fontSize: "13px",
                  border: "none",
                  cursor: "pointer"
                }}
              >
                {submittingComment ? "Posting..." : "💬 Post Comment"}
              </button>
            </form>

            {/* Comments List */}
            {comments.length === 0 ? (
              <p style={{ color: "var(--tx3)", fontSize: "14px", textAlign: "center", padding: "20px" }}>
                No comments yet. Be the first to start the discussion!
              </p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {comments.map((c: any, index: number) => {
                  const initial = c.name ? c.name[0].toUpperCase() : "U";
                  return (
                    <div
                      key={c._id || index}
                      style={{
                        background: "var(--bg2)",
                        border: "1px solid var(--bd)",
                        borderRadius: "12px",
                        padding: "18px 20px"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(0,184,219,0.15)", color: "var(--ac2)", fontWeight: "bold", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {initial}
                          </div>
                          <span style={{ fontSize: "14px", fontWeight: "bold", color: "var(--tx)" }}>
                            {c.name}
                          </span>
                        </div>
                        <span style={{ fontSize: "11px", color: "var(--tx3)" }}>
                          {new Date(c.createdAt || Date.now()).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                      </div>
                      <p style={{ fontSize: "14px", color: "var(--tx2)", lineHeight: 1.6, paddingLeft: "42px", whiteSpace: "pre-wrap" }}>
                        {c.comment}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </article>
      </div>
    </div>
  );
}
