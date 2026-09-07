"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchProjects } from "@/redux/slices/projectSlice";

export function ProjectsSection() {
  const dispatch = useAppDispatch();
  const { projects, loading } = useAppSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("vis"); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".rv, .rvl, .rvr").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [projects]);

  const renderStatusBadge = (st: string) => {
    switch (st) {
      case "completed":
        return (
          <span className="status-pill status-completed">
            <span className="status-dot" /> Completed
          </span>
        );
      case "running":
      case "ongoing":
        return (
          <span className="status-pill status-running">
            <span className="status-dot" /> In Progress
          </span>
        );
      case "planning":
        return (
          <span className="status-pill status-planning">
            <span className="status-dot" /> Planning
          </span>
        );
      default:
        return (
          <span className="status-pill status-completed">
            <span className="status-dot" /> Completed
          </span>
        );
    }
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat?.toLowerCase()) {
      case "mobile": return "📱";
      case "design": return "🎨";
      case "web": default: return "💻";
    }
  };

  return (
    <section id="projects" className="sp">
      <div className="container">
        <div className="sr">
          <div>
            <div className="lbl">Featured Works</div>
            <h2 className="stitle rv" style={{ fontSize: "clamp(22px,2.5vw,36px)", marginBottom: 0 }}>
              Recent Projects & Contributions
            </h2>
          </div>
          <Link href="/projects" className="va">View All Projects →</Link>
        </div>

        {loading ? (
          <div className="pjg">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="pjc rv animate-pulse" style={{ background: "var(--sf)", minHeight: "320px", opacity: 0.6 }}>
                <div className="pjt" style={{ background: "var(--bg2)" }} />
                <div className="pjb space-y-3" style={{ padding: "20px" }}>
                  <div className="h-6 bg-zinc-800 rounded w-2/3" />
                  <div className="h-4 bg-zinc-800 rounded w-full" />
                  <div className="h-4 bg-zinc-800 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">No featured projects found.</p>
        ) : (
          <div className="pjg">
            {projects.map((p) => (
              <Link
                href={`/projects/${p._id}`}
                key={p._id}
                className="pjc rv"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {/* Thumbnail Image Header */}
                <div className="pjt-img-wrap">
                  {(() => {
                    const raw = p.thumbnail?.trim();
                    let isUrl = false;
                    let src = raw;
                    if (raw) {
                      if (raw.startsWith("http://") || raw.startsWith("https://") || raw.startsWith("data:") || raw.startsWith("/") || raw.startsWith("uploads/") || raw.includes("/") || raw.includes(".")) {
                        isUrl = true;
                        if (raw.startsWith("/uploads/") || raw.startsWith("uploads/")) {
                          const host = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "http://localhost:5000";
                          src = raw.startsWith("/") ? `${host}${raw}` : `${host}/${raw}`;
                        }
                      }
                    }

                    if (isUrl && src) {
                      return <img src={src} alt={p.title} className="pjt-img" />;
                    }

                    return (
                      <div className="pjt pt1">
                        {p.thumbnail && p.thumbnail.length <= 4 ? p.thumbnail : getCategoryIcon(p.category)}
                      </div>
                    );
                  })()}

                  {/* Category & Status Overlay */}
                  <div className="pjt-overlay">
                    <span className="cat-badge">{p.category || "web"}</span>
                    {renderStatusBadge(p.status)}
                  </div>
                </div>

                <div className="pjb">
                  <h3 className="pjn">
                    <span>{p.title}</span>
                    <span className="pjn-arrow">↗</span>
                  </h3>
                  <p className="pjd">{p.shortDescription || p.description}</p>

                  {/* Technologies Pills */}
                  <div className="ttgs">
                    {p.technologies?.map((t: string) => (
                      <span key={t} className="ttg">{t}</span>
                    ))}
                  </div>

                  {/* Action Links */}
                  <div className="pjlk">
                    {p.demoUrl && (
                      <a
                        href={p.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pjl pjl-primary"
                        onClick={(e) => e.stopPropagation()}
                      >
                        ⚡ Live Demo
                      </a>
                    )}
                    {p.githubUrl && (
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pjl"
                        onClick={(e) => e.stopPropagation()}
                      >
                        💻 Code
                      </a>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
