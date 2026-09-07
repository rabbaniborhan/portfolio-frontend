"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";
import { useCartStore } from "@/store/cart-store";

export default function CourseDetailsPage() {
  const params = useParams();
  const slug = params.slug as string;
  const router = useRouter();

  const [course, setCourse] = useState<any>(null);
  const [modules, setModules] = useState<any[]>([]);
  const [lessons, setLessons] = useState<any[]>([]);
  const [activeVideoLesson, setActiveVideoLesson] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/courses/slug/${slug}`);
        if (res.data.success) {
          const courseData = res.data.course;
          setCourse(courseData);

          // Fetch modules & lessons
          const curRes = await api.get(`/courses/id/${courseData._id}/curriculum`);
          if (curRes.data.success) {
            setModules(curRes.data.modules || []);
            setLessons(curRes.data.lessons || []);
          }
        } else {
          router.push("/courses");
        }
      } catch (err) {
        console.error(err);
        router.push("/courses");
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchCourseDetails();
  }, [slug, router]);

  const handleEnroll = () => {
    if (!course) return;
    addItem({
      itemId: course._id,
      itemType: "Course",
      title: course.title,
      price: course.discountPrice || course.price,
      emoji: "🎓",
    });
    router.push("/cart");
  };

  // Robust Video Embed URL helper supporting iframe tags, YouTube, and direct video links
  const getVideoEmbedUrl = (url: string) => {
    if (!url) return "";
    let clean = url.trim();

    // Extract src from iframe HTML string if user pasted <iframe src="..."></iframe>
    if (clean.includes("src=")) {
      const matchSrc = clean.match(/src=["']([^"']+)["']/);
      if (matchSrc && matchSrc[1]) {
        clean = matchSrc[1];
      }
    }

    // Convert standard YouTube watch/short link to embed URL
    const youtubeMatch = clean.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);
    if (youtubeMatch && youtubeMatch[2].length === 11) {
      return `https://www.youtube.com/embed/${youtubeMatch[2]}?rel=0&modestbranding=1`;
    }

    return clean;
  };

  if (loading) {
    return (
      <div style={{ paddingTop: "140px", textAlign: "center", minHeight: "80vh" }}>
        <div style={{ display: "inline-block", width: "42px", height: "42px", border: "3px solid rgba(124,106,247,0.2)", borderTopColor: "var(--ac2, #7c6af7)", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
        <p style={{ marginTop: "16px", color: "var(--tx2)", fontSize: "15px" }}>Loading course & video lessons...</p>
      </div>
    );
  }

  if (!course) return null;

  const currentPrice = course.discountPrice || course.price;
  const isFree = Number(currentPrice) === 0;

  return (
    <div style={{ paddingTop: "80px", paddingBottom: "80px", minHeight: "90vh" }}>
      <div className="container" style={{ maxWidth: "1050px" }}>
        <Link
          href="/courses"
          style={{
            color: "var(--ac2, #a78bfa)",
            fontSize: "13px",
            fontWeight: "700",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "28px",
            textDecoration: "none",
            background: "rgba(124,106,247,0.12)",
            padding: "6px 16px",
            borderRadius: "100px",
            border: "1px solid rgba(124,106,247,0.3)"
          }}
        >
          ← Back to All Courses
        </Link>

        {/* Hero Section */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "40px", marginBottom: "48px", alignItems: "start" }} className="cdetail-grid">
          {/* Left Details */}
          <div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "16px" }}>
              <span style={{
                fontSize: "12px",
                color: "var(--ac2, #a78bfa)",
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: "bold",
                textTransform: "uppercase",
                background: "rgba(124,106,247,0.15)",
                padding: "4px 12px",
                borderRadius: "20px",
                border: "1px solid rgba(124,106,247,0.3)"
              }}>
                🎓 {course.level || "BEGINNER"} COURSE
              </span>
            </div>

            <h1 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, lineHeight: 1.2, marginBottom: "16px", color: "var(--tx)" }}>
              {course.title}
            </h1>

            {course.subtitle && (
              <p style={{ fontSize: "17px", color: "var(--tx2)", lineHeight: 1.6, marginBottom: "20px" }}>
                {course.subtitle}
              </p>
            )}

            <p style={{ fontSize: "15px", color: "var(--tx3)", lineHeight: 1.7, marginBottom: "28px" }}>
              {course.description}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", fontSize: "13.5px", color: "var(--tx2)", marginBottom: "28px", padding: "14px 20px", background: "var(--sf2)", borderRadius: "12px", border: "1px solid var(--bd)" }}>
              <span>⏱ <strong>Duration:</strong> {course.duration || "Self-paced"}</span>
              <span>👤 <strong>Instructor:</strong> {course.instructor || "Borhan Rabbani"}</span>
              <span>🎬 <strong>Total Modules:</strong> {modules.length}</span>
              <span>📖 <strong>Lessons:</strong> {lessons.length}</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                {course.discountPrice && (
                  <span style={{ fontSize: "16px", color: "var(--tx3)", textDecoration: "line-through" }}>
                    ${course.price}
                  </span>
                )}
                <span style={{ fontSize: "36px", fontWeight: 800, color: "var(--tx)", fontFamily: "'JetBrains Mono', monospace" }}>
                  {isFree ? "Free" : `$${currentPrice}`}
                </span>
              </div>

              <button
                onClick={handleEnroll}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  background: "linear-gradient(135deg, var(--ac, #7c6af7), #6254d8)",
                  color: "#fff",
                  padding: "16px 36px",
                  borderRadius: "12px",
                  fontSize: "16px",
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 0 32px rgba(124,106,247,0.4)"
                }}
              >
                🎓 {isFree ? "Enroll For Free" : "Buy & Unlock Course"}
              </button>
            </div>
          </div>

          {/* Right Preview Card */}
          <div style={{
            background: "var(--bg2)",
            border: "1px solid rgba(124,106,247,0.3)",
            borderRadius: "20px",
            padding: "24px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
            position: "sticky",
            top: "100px"
          }}>
            <div style={{
              width: "100%",
              height: "220px",
              borderRadius: "12px",
              overflow: "hidden",
              border: "1px solid var(--bd)",
              marginBottom: "20px",
              background: "linear-gradient(135deg, rgba(124,106,247,0.2), rgba(34,211,238,0.1))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              {(() => {
                const raw = course.coverImage?.trim();
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
                  return <img src={src} alt={course.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />;
                }

                return <span style={{ fontSize: "72px" }}>{course.coverImage || "🎓"}</span>;
              })()}
            </div>

            <button
              onClick={handleEnroll}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                background: "linear-gradient(135deg, #7c6af7, #6254d8)",
                color: "#fff",
                padding: "14px",
                borderRadius: "10px",
                fontSize: "15px",
                fontWeight: "700",
                border: "none",
                cursor: "pointer",
                marginBottom: "16px"
              }}
            >
              🎓 Unlock Course Syllabus
            </button>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px", color: "var(--tx2)", paddingTop: "16px", borderTop: "1px solid var(--bd)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "9px" }}><span>♾️</span> Lifetime Access to Videos</div>
              <div style={{ display: "flex", alignItems: "center", gap: "9px" }}><span>📱</span> Stream on Mobile & Desktop</div>
              <div style={{ display: "flex", alignItems: "center", gap: "9px" }}><span>📜</span> Certificate of Completion</div>
            </div>
          </div>
        </div>

        {/* Interactive Curriculum & Video Player Section */}
        <div style={{ background: "var(--bg2)", border: "1px solid var(--bd)", borderRadius: "16px", padding: "36px", marginTop: "32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <div>
              <h3 style={{ fontSize: "22px", fontWeight: 800, color: "var(--tx)" }}>Course Modules & Video Lessons</h3>
              <p style={{ fontSize: "13px", color: "var(--tx2)", marginTop: "4px" }}>
                Click any video lesson to stream YouTube tutorial content.
              </p>
            </div>

            <span style={{ fontSize: "12px", background: "rgba(124,106,247,0.12)", color: "var(--ac2)", padding: "6px 14px", borderRadius: "20px", fontWeight: 700 }}>
              {lessons.length} Video Lessons
            </span>
          </div>

          {modules.length === 0 ? (
            <p style={{ color: "var(--tx3)" }}>Curriculum outline is being compiled.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {modules.map((mod, modIdx) => {
                const moduleLessons = lessons.filter((les) => les.moduleId === mod._id || les.moduleId?._id === mod._id);

                return (
                  <div key={mod._id} style={{ border: "1px solid var(--bd)", borderRadius: "12px", overflow: "hidden", background: "var(--bg)" }}>
                    <div style={{ padding: "16px 20px", background: "var(--sf2)", fontWeight: 700, fontSize: "15px", color: "var(--tx)", borderBottom: "1px solid var(--bd)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span>Module {modIdx + 1}: {mod.title}</span>
                      <span style={{ fontSize: "12px", color: "var(--tx3)", fontWeight: 400 }}>{moduleLessons.length} lessons</span>
                    </div>

                    <div style={{ padding: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
                      {moduleLessons.map((les) => {
                        const canWatch = Boolean(les.videoUrl && les.videoUrl.trim().length > 0);

                        return (
                          <div
                            key={les._id}
                            onClick={() => {
                              if (canWatch) {
                                setActiveVideoLesson(les);
                              } else {
                                handleEnroll();
                              }
                            }}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              fontSize: "14px",
                              padding: "12px 16px",
                              background: activeVideoLesson?._id === les._id
                                ? "rgba(124,106,247,0.12)"
                                : canWatch
                                ? "var(--bg2)"
                                : "rgba(255,255,255,0.02)",
                              borderRadius: "8px",
                              border: "1px solid var(--bd)",
                              cursor: "pointer",
                              transition: "all 0.2s"
                            }}
                          >
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                              <span style={{ color: canWatch ? "var(--ac2)" : "var(--tx3)", fontSize: "16px" }}>
                                {canWatch ? "▶️" : "🔒"}
                              </span>
                              <span style={{ fontWeight: 600, color: canWatch ? "var(--tx)" : "var(--tx3)" }}>
                                {les.title}
                              </span>

                              {les.isFree && (
                                <span style={{ fontSize: "11px", background: "rgba(52,211,153,0.15)", color: "var(--gr, #34d399)", padding: "2px 8px", borderRadius: "100px", fontWeight: 700 }}>
                                  FREE PREVIEW
                                </span>
                              )}

                              {!canWatch && !les.isFree && (
                                <span style={{ fontSize: "11px", background: "rgba(239,68,68,0.12)", color: "#f87171", padding: "2px 8px", borderRadius: "100px", fontWeight: 700 }}>
                                  ENROLLMENT REQUIRED
                                </span>
                              )}
                            </div>

                            <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "12px", color: "var(--tx3)" }}>
                              <span>⏱ {les.duration || "10 mins"}</span>
                              {canWatch ? (
                                <span style={{ color: "var(--ac2)", fontWeight: 700 }}>Watch →</span>
                              ) : (
                                <span style={{ color: "#f87171", fontWeight: 700 }}>Unlock 🔒</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Video Streaming Modal */}
      {activeVideoLesson && (
        <div style={{
          position: "fixed",
          inset: 0,
          zIndex: 100,
          background: "rgba(0,0,0,0.85)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px"
        }}>
          <div style={{
            background: "var(--bg2)",
            border: "1px solid var(--bd)",
            borderRadius: "20px",
            width: "100%",
            maxWidth: "860px",
            overflow: "hidden",
            boxShadow: "0 30px 80px rgba(0,0,0,0.8)"
          }}>
            <div style={{ padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--bd)" }}>
              <div>
                <h3 style={{ fontSize: "18px", fontWeight: 800, color: "var(--tx)" }}>{activeVideoLesson.title}</h3>
                <p style={{ fontSize: "12px", color: "var(--tx3)" }}>Streaming Video Lesson</p>
              </div>
              <button
                onClick={() => setActiveVideoLesson(null)}
                style={{ background: "none", border: "none", color: "var(--tx)", fontSize: "24px", cursor: "pointer", fontWeight: "bold" }}
              >
                ✕
              </button>
            </div>

            <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", background: "#000" }}>
              {activeVideoLesson.videoUrl?.includes("<iframe") ? (
                <div
                  style={{ width: "100%", height: "100%" }}
                  dangerouslySetInnerHTML={{
                    __html: activeVideoLesson.videoUrl.replace(
                      /<iframe /i,
                      '<iframe style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" '
                    )
                  }}
                />
              ) : activeVideoLesson.videoUrl?.endsWith(".mp4") || activeVideoLesson.videoUrl?.endsWith(".webm") ? (
                <video
                  src={activeVideoLesson.videoUrl}
                  controls
                  autoPlay
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
                />
              ) : (
                <iframe
                  src={getVideoEmbedUrl(activeVideoLesson.videoUrl)}
                  title={activeVideoLesson.title}
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              )}
            </div>

            {activeVideoLesson.content && (
              <div style={{ padding: "20px 24px", fontSize: "14px", color: "var(--tx2)", borderTop: "1px solid var(--bd)", lineHeight: 1.6 }}>
                <strong>Lesson Notes:</strong>
                <p style={{ marginTop: "4px", whiteSpace: "pre-wrap" }}>{activeVideoLesson.content}</p>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .cdetail-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
