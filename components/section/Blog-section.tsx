"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchBlogPosts } from "@/redux/slices/blogSlice";

export function BlogSection() {
  const dispatch = useAppDispatch();
  const { posts, loading } = useAppSelector((state) => state.blog);

  useEffect(() => {
    dispatch(fetchBlogPosts());
  }, [dispatch]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("vis"); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".rv, .rvl, .rvr").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [posts]);

  const getColorClass = (index: number) => {
    const classes = ["bc1", "bc2", "bc3"];
    return classes[index % classes.length];
  };

  const getExcerpt = (content: string) => {
    if (!content) return "";
    const plain = content.replace(/<[^>]*>/g, "").replace(/[#*`_]/g, "").trim();
    if (plain.length <= 100) return plain;
    return plain.slice(0, 97) + "...";
  };

  return (
    <section id="blog" className="sp">
      <div className="container">
        <div className="sr">
          <div>
            <div className="lbl">Latest Articles</div>
            <h2 className="stitle rv" style={{ fontSize: "clamp(22px,2.5vw,32px)", marginBottom: 0 }}>
              From The Blog
            </h2>
          </div>
          <Link href="/blog" className="va">View All Posts →</Link>
        </div>

        {loading ? (
          <div className="blg animate-pulse">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="blc rv" style={{ background: "var(--sf)", minHeight: "180px", opacity: 0.6 }} />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">No articles published yet.</p>
        ) : (
          <div className="blg">
            {posts.map((p, idx) => (
              <Link href={`/blog/${p.slug}`} key={p._id} className="blc rv">
                <div className={`blcv ${getColorClass(idx)}`} style={{ overflow: "hidden" }}>
                  {p.bannerImage?.startsWith("http") || p.bannerImage?.startsWith("data:") ? (
                    <img src={p.bannerImage} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <span>{p.bannerImage || "✍️"}</span>
                  )}
                </div>
                <div className="blb">
                  <div className="blm">
                    <span className="blcat">{p.categories?.[0] || "General"}</span>
                    <span className="bldt">{p.createdAt ? new Date(p.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : ""}</span>
                  </div>
                  <div className="blti">{p.title}</div>
                  <div className="blex">{getExcerpt(p.content)}</div>
                  <div className="blrd">Read more →</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
