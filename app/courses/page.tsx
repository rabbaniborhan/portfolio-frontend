"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";

export default function CoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await api.get("/courses");
        if (res.data.success) {
          setCourses(res.data.courses);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div style={{ paddingTop: "64px" }}>
      <section className="sp">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div className="lbl" style={{ justifyContent: "center" }}>Learn Programming</div>
            <h1 className="stitle">Interactive Courses</h1>
            <p className="sdesc" style={{ maxWidth: "580px", margin: "0 auto" }}>
              Practical coding courses designed to take you from beginner to job-ready software developer.
            </p>
          </div>

          {/* Stats row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", border: "1px solid var(--bd)", borderRadius: "var(--r)", overflow: "hidden", background: "var(--sf)", marginBottom: "56px" }}>
            {[
              { n: "8+", l: "Practical Courses" },
              { n: "5K+", l: "Enrolled Students" },
              { n: "200+", l: "Hours of Content" },
              { n: "4.9★", l: "Average Rating" },
            ].map((s) => (
              <div key={s.l} className="si" style={{ padding: "20px", textAlign: "center", borderRight: "1px solid var(--bd)" }}>
                <span className="sn" style={{ fontSize: "24px", fontWeight: "bold", display: "block", color: "var(--ac)" }}>{s.n}</span>
                <div className="sl" style={{ fontSize: "12px", color: "var(--tx3)", marginTop: "4px" }}>{s.l}</div>
              </div>
            ))}
          </div>

          {/* Courses listing */}
          {loading ? (
            <p style={{ textAlign: "center" }}>Loading courses catalog...</p>
          ) : courses.length === 0 ? (
            <p style={{ textAlign: "center", color: "var(--tx3)" }}>No courses published yet.</p>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "24px" }}>
              {courses.map((c) => {
                const finalPrice = c.discountPrice || c.price;
                return (
                  <Link key={c._id} href={`/courses/${c.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <div className="crs-card" style={{ border: "1px solid var(--bd)", borderRadius: "12px", overflow: "hidden", background: "var(--sf)" }}>
                      {/* Thumbnail */}
                      <div style={{ height: "160px", background: "linear-gradient(135deg,#1a0533,#2d1b69)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                        {(() => {
                          const raw = c.coverImage?.trim();
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
                            return <img src={src} alt={c.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />;
                          }

                          return <span style={{ fontSize: "48px" }}>{c.coverImage || "🎓"}</span>;
                        })()}
                      </div>

                      {/* Body */}
                      <div style={{ padding: "20px" }}>
                        <span style={{ fontSize: "10px", padding: "2px 8px", borderRadius: "12px", background: "rgba(124,106,247,0.15)", color: "var(--ac)", textTransform: "uppercase", fontWeight: "bold" }}>
                          {c.level}
                        </span>
                        <h3 style={{ fontSize: "17px", fontWeight: "bold", margin: "8px 0", color: "var(--tx)", lineHeight: 1.4 }}>{c.title}</h3>
                        <p style={{ fontSize: "13px", color: "var(--tx3)", marginBottom: "16px", height: "60px", overflow: "hidden" }}>{c.subtitle || c.description}</p>

                        <div style={{ display: "flex", gap: "16px", fontSize: "11px", color: "var(--tx3)", marginBottom: "16px", fontFamily: "'JetBrains Mono', monospace" }}>
                          <span>⏱ {c.duration || "Self-paced"}</span>
                          <span>👤 By {c.instructor}</span>
                        </div>

                        <div style={{ borderTop: "1px solid var(--bd)", paddingTop: "16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <div>
                            {c.discountPrice && (
                              <span style={{ fontSize: "12px", color: "var(--tx3)", textDecoration: "line-through", marginRight: "6px" }}>${c.price}</span>
                            )}
                            <span style={{ fontSize: "20px", fontWeight: "bold", color: "var(--ac)", fontFamily: "'JetBrains Mono', monospace" }}>
                              ${finalPrice}
                            </span>
                          </div>
                          <span className="buyb" style={{ fontSize: "12px", padding: "8px 16px" }}>Enroll Now</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
