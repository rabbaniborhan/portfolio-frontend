"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchProjectById, fetchProjects } from "@/redux/slices/projectSlice";

export default function ProjectDetailPage() {
  const params = useParams();
  const id = (params.slug || params.id) as string;
  const router = useRouter();

  const dispatch = useAppDispatch();
  const { currentProject: project, projects: allProjects, loading } = useAppSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchProjects());
    if (id) {
      dispatch(fetchProjectById(id)).then((res: any) => {
        if (!res.payload) router.push("/projects");
      });
    }
  }, [id, router, dispatch]);

  if (loading) {
    return (
      <div style={{ paddingTop: "140px", textAlign: "center", minHeight: "80vh" }}>
        <div style={{ display: "inline-block", width: "42px", height: "42px", border: "3px solid rgba(124,106,247,0.2)", borderTopColor: "var(--ac2, #7c6af7)", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
        <p style={{ marginTop: "16px", color: "var(--tx2)", fontSize: "15px" }}>Loading project details & showcase...</p>
      </div>
    );
  }

  if (!project) return null;

  // Format image helper
  const rawImg = project.thumbnail?.trim();
  let isUrl = false;
  let imgSrc = rawImg;
  if (rawImg) {
    if (rawImg.startsWith("http://") || rawImg.startsWith("https://") || rawImg.startsWith("data:") || rawImg.startsWith("/") || rawImg.startsWith("uploads/") || rawImg.includes("/") || rawImg.includes(".")) {
      isUrl = true;
      if (rawImg.startsWith("/uploads/") || rawImg.startsWith("uploads/")) {
        const host = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "http://localhost:5000";
        imgSrc = rawImg.startsWith("/") ? `${host}${rawImg}` : `${host}/${rawImg}`;
      }
    }
  }

  const relatedProjects = allProjects.filter((p: any) => p._id !== project._id).slice(0, 3);

  return (
    <div style={{ paddingTop: "100px", paddingBottom: "80px", minHeight: "90vh" }}>
      <div className="container" style={{ maxWidth: "960px" }}>
        {/* Back Link */}
        <Link
          href="/projects"
          style={{
            color: "var(--ac2)",
            fontSize: "14px",
            fontWeight: "bold",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "28px",
            padding: "8px 16px",
            borderRadius: "10px",
            background: "var(--sf)",
            border: "1px solid var(--bd)",
            textDecoration: "none",
            transition: "all 0.2s"
          }}
        >
          ← Back to All Projects
        </Link>

        <article>
          {/* Top Metadata Badges */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", padding: "4px 12px", borderRadius: "20px", background: "rgba(0,184,219,0.12)", color: "var(--ac2)", border: "1px solid rgba(0,184,219,0.3)", letterSpacing: ".06em" }}>
              🏷️ {project.category || "Web App"}
            </span>

            <span className={`status-pill ${project.status === "completed" ? "status-completed" : "status-running"}`}>
              <span className="status-dot" /> {project.status ? project.status.toUpperCase() : "COMPLETED"}
            </span>
          </div>

          {/* Title & Subtitle */}
          <h1 style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 800, lineHeight: 1.2, marginBottom: "16px", color: "var(--tx)" }}>
            {project.title}
          </h1>

          <p style={{ fontSize: "17px", color: "var(--tx2)", lineHeight: 1.7, marginBottom: "32px", maxWidth: "800px" }}>
            {project.shortDescription || project.description}
          </p>

          {/* Hero Showcase Image */}
          <div style={{ width: "100%", aspectRatio: "16/9", maxHeight: "480px", background: "var(--bg2)", borderRadius: "20px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "36px", border: "1px solid var(--bd)", boxShadow: "0 20px 50px rgba(0,0,0,0.4)", position: "relative" }}>
            {isUrl && imgSrc ? (
              <img src={imgSrc} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <span style={{ fontSize: "88px" }}>{project.thumbnail && project.thumbnail.length <= 4 ? project.thumbnail : "💻"}</span>
            )}
          </div>

          {/* Key Info Cards Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginBottom: "36px" }}>
            {/* Tech Stack */}
            <div style={{ background: "var(--bg2)", border: "1px solid var(--bd)", borderRadius: "16px", padding: "24px" }}>
              <h3 style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "14px", color: "var(--tx)", textTransform: "uppercase", letterSpacing: ".05em" }}>
                🛠️ Technologies Used
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {project.technologies?.map((tech: string) => (
                  <span key={tech} className="ttg" style={{ fontSize: "12px", padding: "6px 12px" }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Action Links */}
            <div style={{ background: "var(--bg2)", border: "1px solid var(--bd)", borderRadius: "16px", padding: "24px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <h3 style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "14px", color: "var(--tx)", textTransform: "uppercase", letterSpacing: ".05em" }}>
                🔗 Project Links
              </h3>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                {project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flex: 1,
                      textAlign: "center",
                      padding: "12px 20px",
                      borderRadius: "10px",
                      background: "linear-gradient(135deg, var(--ac), #0096b8)",
                      color: "#ffffff",
                      fontWeight: "bold",
                      fontSize: "13px",
                      textDecoration: "none",
                      boxShadow: "0 4px 14px rgba(0,184,219,0.3)",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px"
                    }}
                  >
                    ⚡ Live Preview
                  </a>
                ) : (
                  <span style={{ fontSize: "13px", color: "var(--tx3)" }}>No live demo link available</span>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: "12px 20px",
                      borderRadius: "10px",
                      background: "var(--sf)",
                      color: "var(--tx)",
                      border: "1px solid var(--bd2)",
                      fontWeight: "bold",
                      fontSize: "13px",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px"
                    }}
                  >
                    💻 Source Code
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Role & Contribution Card */}
          {project.contribution && (
            <div style={{ background: "rgba(0,184,219,0.06)", border: "1px solid rgba(0,184,219,0.25)", borderRadius: "16px", padding: "28px", marginBottom: "24px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "bold", color: "var(--ac2)", marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span>👤</span> My Role & Technical Contribution
              </h3>
              <p style={{ fontSize: "15px", color: "var(--tx)", lineHeight: 1.75, whiteSpace: "pre-wrap" }}>{project.contribution}</p>
            </div>
          )}

          {/* Key Challenges Card */}
          {project.challenges && (
            <div style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.25)", borderRadius: "16px", padding: "28px", marginBottom: "36px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "bold", color: "#fbbf24", marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span>💡</span> Architectural Challenges & Solutions
              </h3>
              <p style={{ fontSize: "15px", color: "var(--tx)", lineHeight: 1.75, whiteSpace: "pre-wrap" }}>{project.challenges}</p>
            </div>
          )}

          {/* Full Detailed Description */}
          <div style={{ background: "var(--bg2)", border: "1px solid var(--bd)", borderRadius: "16px", padding: "32px", marginBottom: "56px" }}>
            <h3 style={{ fontSize: "20px", fontWeight: "bold", color: "var(--tx)", marginBottom: "16px", borderBottom: "1px solid var(--bd)", paddingBottom: "12px" }}>
              Full Project Overview & Case Study
            </h3>
            <div style={{ fontSize: "15px", color: "var(--tx2)", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>
              {project.description}
            </div>
          </div>
        </article>

        {/* ═══ RELATED PROJECTS SECTION ═══ */}
        {relatedProjects.length > 0 && (
          <section style={{ borderTop: "1px solid var(--bd)", paddingTop: "48px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
              <div>
                <h2 style={{ fontSize: "24px", fontWeight: 800, color: "var(--tx)" }}>Related Projects</h2>
                <p style={{ fontSize: "14px", color: "var(--tx3)" }}>Explore other software engineering & web applications</p>
              </div>
              <Link href="/projects" style={{ color: "var(--ac2)", fontSize: "13px", fontWeight: "bold", textDecoration: "none" }}>
                View All Projects →
              </Link>
            </div>

            <div className="pjg">
              {relatedProjects.map((rp: any) => {
                const rpRaw = rp.thumbnail?.trim();
                let rpIsUrl = false;
                let rpImgSrc = rpRaw;
                if (rpRaw) {
                  if (rpRaw.startsWith("http") || rpRaw.startsWith("data:") || rpRaw.startsWith("/") || rpRaw.startsWith("uploads/") || rpRaw.includes(".") || rpRaw.includes("/")) {
                    rpIsUrl = true;
                    if (rpRaw.startsWith("/uploads/") || rpRaw.startsWith("uploads/")) {
                      const host = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "http://localhost:5000";
                      rpImgSrc = rpRaw.startsWith("/") ? `${host}${rpRaw}` : `${host}/${rpRaw}`;
                    }
                  }
                }

                return (
                  <Link key={rp._id} href={`/projects/${rp._id}`} style={{ textDecoration: "none" }} className="pjc">
                    <div className="pjt-img-wrap">
                      {rpIsUrl && rpImgSrc ? (
                        <img src={rpImgSrc} alt={rp.title} className="pjt-img" />
                      ) : (
                        <div className="pjt">{rp.thumbnail && rp.thumbnail.length <= 4 ? rp.thumbnail : "💻"}</div>
                      )}
                    </div>
                    <div className="pjb">
                      <div className="pjn">{rp.title} <span className="pjn-arrow">↗</span></div>
                      <div className="pjd">{rp.shortDescription || rp.description}</div>
                      <div className="ttgs">
                        {rp.technologies?.slice(0, 3).map((t: string) => (
                          <span key={t} className="ttg">{t}</span>
                        ))}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
