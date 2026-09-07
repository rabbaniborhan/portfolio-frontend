"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";

const categories = ["All", "Frontend", "Backend", "AI & Automation", "DevOps", "Freelancing", "Tutorials"];

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCat, setSelectedCat] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        let url = `/blog`;
        const params = [];
        if (selectedCat !== "All") params.push(`category=${selectedCat}`);
        if (search) params.push(`search=${search}`);
        if (params.length > 0) {
          url += `?${params.join("&")}`;
        }
        const res = await api.get(url);
        if (res.data.success) {
          setPosts(res.data.posts);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [selectedCat, search]);

  return (
    <div style={{ paddingTop: "64px" }}>
      <section className="sp">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <div className="lbl" style={{ justifyContent: "center" }}>Articles & Tutorials</div>
            <h1 className="stitle">Technical Blog</h1>
            <p className="sdesc" style={{ maxWidth: "560px", margin: "0 auto" }}>
              Insights on full stack development, AI, DevOps, and the business of freelancing.
            </p>
          </div>

          {/* Search */}
          <div style={{ maxWidth: "500px", margin: "0 auto 40px", position: "relative" }}>
            <input
              type="text"
              placeholder="🔍  Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%", background: "var(--bg2)", border: "1px solid var(--bd)",
                borderRadius: "12px", padding: "14px 20px", fontSize: "14px", color: "var(--tx)",
                fontFamily: "'Space Grotesk', sans-serif", outline: "none"
              }}
            />
          </div>

          {/* Categories */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", marginBottom: "48px" }}>
            {categories.map((c) => (
              <span
                key={c}
                onClick={() => setSelectedCat(c)}
                style={{
                  padding: "6px 18px", borderRadius: "20px", border: "1px solid var(--bd2)",
                  background: c === selectedCat ? "var(--ac)" : "var(--sf)",
                  color: c === selectedCat ? "#fff" : "var(--tx2)",
                  fontSize: "12px", cursor: "pointer", fontFamily: "'JetBrains Mono', monospace"
                }}
              >
                {c}
              </span>
            ))}
          </div>

          {/* Posts grid */}
          {loading ? (
            <p style={{ textAlign: "center" }}>Loading blog posts...</p>
          ) : posts.length === 0 ? (
            <p style={{ textAlign: "center", color: "var(--tx3)" }}>No posts found.</p>
          ) : (
            <div className="blg" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
              {posts.map((p) => (
                <Link href={`/blog/${p.slug}`} key={p._id} className="blc">
                  <div className="blcv bc1" style={{ overflow: "hidden" }}>
                    {p.bannerImage?.startsWith("http") || p.bannerImage?.startsWith("data:") ? (
                      <img src={p.bannerImage} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <span>{p.bannerImage || "✍️"}</span>
                    )}
                  </div>
                  <div className="blb">
                    <div className="blm">
                      <span className="blcat">{p.categories?.[0] || "General"}</span>
                      <span className="bldt">{new Date(p.createdAt).toLocaleDateString()}</span>
                      <span className="bldt" style={{ marginLeft: "auto" }}>⏱ {p.readTime}</span>
                    </div>
                    <div className="blti">{p.title}</div>
                    <div className="blex">{p.content.substring(0, 100).replace(/<[^>]*>/g, "")}…</div>
                    <div className="blrd">Read more →</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
