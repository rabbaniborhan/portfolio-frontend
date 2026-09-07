"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchSkills } from "@/redux/slices/skillSlice";

const categories = ["All", "Frontend", "Backend", "Database", "DevOps & Tools"];

export function SkillsSection() {
  const dispatch = useAppDispatch();
  const { skills, loading } = useAppSelector((state) => state.skills);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    dispatch(fetchSkills());
  }, [dispatch]);

  const filteredSkills = selectedCategory === "All"
    ? skills
    : skills.filter((s) => {
        const cat = s.category?.toLowerCase() || "";
        const sel = selectedCategory.toLowerCase();
        if (sel.includes("devops")) return cat.includes("devops") || cat.includes("tool") || cat.includes("cloud");
        return cat.includes(sel);
      });

  const getLevelLabel = (level: number) => {
    if (level >= 90) return "Expert";
    if (level >= 80) return "Advanced";
    if (level >= 70) return "Proficient";
    return "Intermediate";
  };

  const getSkillIcon = (s: any) => {
    const raw = s.icon?.trim();
    if (!raw) return { isUrl: false, src: "", emoji: "💻" };
    if (raw.startsWith("http://") || raw.startsWith("https://") || raw.startsWith("data:") || raw.startsWith("/") || raw.startsWith("uploads/") || raw.includes("/") || raw.includes(".")) {
      let src = raw;
      if (raw.startsWith("/uploads/") || raw.startsWith("uploads/")) {
        const host = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "http://localhost:5000";
        src = raw.startsWith("/") ? `${host}${raw}` : `${host}/${raw}`;
      }
      return { isUrl: true, src, emoji: "💻" };
    }
    return { isUrl: false, src: "", emoji: raw };
  };

  return (
    <section
      id="skills"
      className="sp"
      style={{
        background: "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0, 184, 219, 0.09), transparent 80%), linear-gradient(180deg, var(--bg) 0%, var(--bg2) 50%, var(--bg) 100%)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Modern Ambient Backdrop Orbs */}
      <div style={{ position: "absolute", top: "15%", left: "5%", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(0,184,219,0.08) 0%, transparent 70%)", pointerEvents: "none", filter: "blur(40px)" }} />
      <div style={{ position: "absolute", bottom: "15%", right: "5%", width: "350px", height: "350px", background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)", pointerEvents: "none", filter: "blur(40px)" }} />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div className="lbl" style={{ justifyContent: "center" }}>Technical Proficiency</div>
          <h2 className="stitle" style={{ fontSize: "clamp(24px, 3vw, 38px)" }}>
            Skills &amp; Tech Stack
          </h2>
          <p className="sdesc" style={{ maxWidth: "600px", margin: "0 auto" }}>
            A comprehensive overview of my technical skills across frontend, backend, database architecture, and tools.
          </p>
        </div>

        {/* Category Tabs */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center", marginBottom: "40px" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: "8px 22px",
                borderRadius: "30px",
                border: "1px solid " + (cat === selectedCategory ? "var(--ac2)" : "var(--bd)"),
                background: cat === selectedCategory ? "linear-gradient(135deg, var(--ac), #6366f1)" : "var(--bg2)",
                color: cat === selectedCategory ? "#ffffff" : "var(--tx2)",
                fontSize: "12px",
                fontWeight: "bold",
                cursor: "pointer",
                fontFamily: "'JetBrains Mono', monospace",
                transition: "all 0.25s ease",
                boxShadow: cat === selectedCategory ? "0 4px 16px rgba(0,184,219,0.3)" : "none"
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        {loading ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "20px" }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse" style={{ background: "var(--bg2)", border: "1px solid var(--bd)", borderRadius: "16px", padding: "24px", height: "140px" }} />
            ))}
          </div>
        ) : filteredSkills.length === 0 ? (
          <p style={{ textAlign: "center", color: "var(--tx3)", padding: "40px" }}>No skills listed in this category yet.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "20px" }}>
            {filteredSkills.map((s) => {
              const iconData = getSkillIcon(s);
              const lvlText = getLevelLabel(s.proficiency || 85);
              const pct = s.proficiency || 85;

              return (
                <div
                  key={s._id}
                  style={{
                    background: "var(--bg2)",
                    border: "1px solid var(--bd)",
                    borderRadius: "16px",
                    padding: "20px 24px",
                    position: "relative",
                    overflow: "hidden",
                    transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                  }}
                  className="sk-card-hover"
                >
                  <div>
                    {/* Top Row: Icon + Level Badge */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                      <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: "rgba(0,184,219,0.08)", border: "1px solid rgba(0,184,219,0.2)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                        {iconData.isUrl ? (
                          <img src={iconData.src} alt={s.name} style={{ width: "24px", height: "24px", objectFit: "contain" }} />
                        ) : (
                          <span style={{ fontSize: "20px" }}>{iconData.emoji}</span>
                        )}
                      </div>

                      <span style={{ fontSize: "10px", fontWeight: 800, padding: "4px 10px", borderRadius: "12px", background: "rgba(0,184,219,0.12)", color: "var(--ac2)", border: "1px solid rgba(0,184,219,0.25)", textTransform: "uppercase", letterSpacing: ".05em" }}>
                        {lvlText}
                      </span>
                    </div>

                    {/* Skill Title & Category */}
                    <h3 style={{ fontSize: "16px", fontWeight: "bold", color: "var(--tx)", marginBottom: "4px" }}>
                      {s.name}
                    </h3>
                    <div style={{ fontSize: "11px", color: "var(--tx3)", fontFamily: "'JetBrains Mono', monospace", marginBottom: "16px", textTransform: "uppercase" }}>
                      {s.category || "Full Stack"}
                    </div>
                  </div>

                  {/* Progress Bar & Percentage */}
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "var(--tx2)", fontWeight: "bold", marginBottom: "6px", fontFamily: "'JetBrains Mono', monospace" }}>
                      <span>Proficiency</span>
                      <span style={{ color: "var(--ac2)" }}>{pct}%</span>
                    </div>
                    <div style={{ width: "100%", height: "6px", background: "var(--sf)", borderRadius: "10px", overflow: "hidden", border: "1px solid var(--bd)" }}>
                      <div
                        style={{
                          width: `${pct}%`,
                          height: "100%",
                          background: "linear-gradient(90deg, var(--ac), #6366f1)",
                          borderRadius: "10px",
                          boxShadow: "0 0 12px rgba(0,184,219,0.5)",
                          transition: "width 1s ease-in-out"
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        .sk-card-hover:hover {
          transform: translateY(-5px);
          border-color: rgba(0, 184, 219, 0.4) !important;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 184, 219, 0.15) !important;
        }
      `}</style>
    </section>
  );
}
