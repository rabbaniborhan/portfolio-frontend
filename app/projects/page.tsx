"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchProjects } from "@/redux/slices/projectSlice";

const techFilters = ["All", "React", "Next.js", "Node.js", "MongoDB", "PostgreSQL", "TypeScript", "REST API", "Docker", "Stripe"];

export default function ProjectsPage() {
  const dispatch = useAppDispatch();
  const { projects, loading } = useAppSelector((state) => state.projects);
  const [selectedFilter, setSelectedFilter] = useState("All");

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const filteredProjects = selectedFilter === "All"
    ? projects
    : projects.filter((p) => p.technologies?.some((tech: string) => tech.toLowerCase() === selectedFilter.toLowerCase()));

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
    <div style={{ paddingTop: "64px" }}>
      <section className="sp">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div className="lbl" style={{ justifyContent: "center" }}>My Work</div>
            <h1 className="stitle">All Projects</h1>
            <p className="sdesc" style={{ maxWidth: "560px", margin: "0 auto" }}>
              A complete showcase of projects I've built — featuring full-stack applications, contributions, and live demos.
            </p>
          </div>

          {/* Filter bar */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", marginBottom: "48px" }}>
            {techFilters.map((t) => (
              <span
                key={t}
                onClick={() => setSelectedFilter(t)}
                style={{
                  padding: "6px 16px", borderRadius: "20px", border: "1px solid var(--bd2)",
                  background: t === selectedFilter ? "var(--ac)" : "var(--sf)",
                  color: t === selectedFilter ? "#fff" : "var(--tx2)",
                  fontSize: "12px", cursor: "pointer", fontFamily: "'JetBrains Mono', monospace", transition: "all .2s"
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Grid */}
          {loading ? (
            <p style={{ textAlign: "center" }}>Loading projects...</p>
          ) : filteredProjects.length === 0 ? (
            <p style={{ textAlign: "center", color: "var(--tx3)" }}>No projects found matching the filter.</p>
          ) : (
            <div className="pjg">
              {filteredProjects.map((p) => (
                <Link
                  href={`/projects/${p._id}`}
                  key={p._id}
                  className="pjc"
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

                    {/* Overlay */}
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

                    <div className="ttgs">
                      {p.technologies?.map((t: string) => (
                        <span key={t} className="ttg">{t}</span>
                      ))}
                    </div>

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
    </div>
  );
}
