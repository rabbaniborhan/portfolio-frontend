"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "@/lib/api";
import { useAuthStore } from "@/store/auth-store";

export default function CourseLearningInterface() {
  const params = useParams();
  const slug = params.slug as string;
  const { user, checked } = useAuthStore();
  const router = useRouter();

  const [course, setCourse] = useState<any>(null);
  const [modules, setModules] = useState<any[]>([]);
  const [lessons, setLessons] = useState<any[]>([]);
  const [currentLesson, setCurrentLesson] = useState<any>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (checked && !user) {
      router.push("/login");
    }
  }, [user, checked, router]);

  useEffect(() => {
    const fetchSyllabus = async () => {
      try {
        setLoading(true);
        // 1. Fetch course details
        const courseRes = await api.get(`/courses/slug/${slug}`);
        if (!courseRes.data.success) {
          router.push("/courses");
          return;
        }
        const courseData = courseRes.data.course;
        setCourse(courseData);

        // 2. Fetch curriculum (modules & lessons)
        const curRes = await api.get(`/courses/id/${courseData._id}/curriculum`);
        if (curRes.data.success) {
          setModules(curRes.data.modules || []);
          setLessons(curRes.data.lessons || []);
          if (curRes.data.lessons?.length > 0) {
            setCurrentLesson(curRes.data.lessons[0]);
          }
        }

        // 3. Fetch student enrollment progress
        const progRes = await api.get(`/courses/id/${courseData._id}/progress`);
        if (progRes.data.success) {
          setCompletedLessons(progRes.data.enrollment.completedLessons || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user && slug) {
      fetchSyllabus();
    }
  }, [user, slug, router]);

  const handleToggleComplete = async (lessonId: string) => {
    if (!course) return;
    try {
      const res = await api.post(`/courses/id/${course._id}/lessons/${lessonId}/complete`);
      if (res.data.success) {
        setCompletedLessons(res.data.enrollment.completedLessons || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const currentIndex = lessons.findIndex((l) => l._id === currentLesson?._id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < lessons.length - 1;

  const handlePrevLesson = () => {
    if (hasPrev) {
      setCurrentLesson(lessons[currentIndex - 1]);
    }
  };

  const handleNextLesson = () => {
    if (hasNext) {
      if (currentLesson && !completedLessons.includes(currentLesson._id)) {
        handleToggleComplete(currentLesson._id);
      }
      setCurrentLesson(lessons[currentIndex + 1]);
    }
  };

  // Helper to extract iframe src or transform YouTube links into embed URLs
  const getVideoEmbedUrl = (rawUrl: string) => {
    if (!rawUrl) return "";
    let clean = rawUrl.trim();

    // Extract src from iframe HTML string if user pasted <iframe src="..."></iframe>
    if (clean.includes("src=")) {
      const matchSrc = clean.match(/src=["']([^"']+)["']/);
      if (matchSrc && matchSrc[1]) {
        clean = matchSrc[1];
      }
    }

    // Standard YouTube URL matcher
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
        <p style={{ marginTop: "16px", color: "var(--tx2)", fontSize: "15px" }}>Loading course workspace & lessons...</p>
      </div>
    );
  }

  if (!course) return null;

  return (
    <div style={{ paddingTop: "80px", display: "grid", gridTemplateColumns: "1fr 360px", minHeight: "100vh" }} className="cworkspace-grid">
      {/* Left side: Content / Player */}
      <div style={{ padding: "32px", borderRight: "1px solid var(--bd)", display: "flex", flexDirection: "column", gap: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <span style={{ fontSize: "12px", color: "var(--ac2)", fontFamily: "'JetBrains Mono', monospace", fontWeight: "bold" }}>
              COURSE WORKSPACE
            </span>
            <h1 style={{ fontSize: "26px", fontWeight: "bold", marginTop: "4px", color: "var(--tx)" }}>{course.title}</h1>
          </div>
        </div>

        {currentLesson ? (
          <>
            {/* Video Container supporting raw <iframe ...>, mp4, and YouTube links */}
            <div style={{ aspectRatio: "16/9", background: "#000", borderRadius: "14px", position: "relative", overflow: "hidden", border: "1px solid var(--bd)", boxShadow: "0 20px 50px rgba(0,0,0,0.5)" }}>
              {currentLesson.videoUrl?.includes("<iframe") ? (
                <div
                  style={{ width: "100%", height: "100%" }}
                  dangerouslySetInnerHTML={{
                    __html: currentLesson.videoUrl.replace(
                      /<iframe /i,
                      '<iframe style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" '
                    )
                  }}
                />
              ) : currentLesson.videoUrl?.endsWith(".mp4") || currentLesson.videoUrl?.endsWith(".webm") ? (
                <video
                  src={currentLesson.videoUrl}
                  controls
                  autoPlay
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
                />
              ) : (
                <iframe
                  src={getVideoEmbedUrl(currentLesson.videoUrl)}
                  title={currentLesson.title}
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              )}
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px", flexWrap: "wrap", gap: "12px" }}>
                <h2 style={{ fontSize: "20px", fontWeight: "bold", color: "var(--tx)" }}>{currentLesson.title}</h2>
                
                <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                  <button
                    disabled={!hasPrev}
                    onClick={handlePrevLesson}
                    style={{
                      background: hasPrev ? "var(--bg2)" : "rgba(255,255,255,0.03)",
                      color: hasPrev ? "var(--tx)" : "var(--tx3)",
                      padding: "10px 18px",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      fontSize: "13px",
                      border: "1px solid var(--bd)",
                      cursor: hasPrev ? "pointer" : "not-allowed",
                      opacity: hasPrev ? 1 : 0.4,
                      transition: "all 0.2s"
                    }}
                  >
                    ← Previous Lesson
                  </button>

                  <button
                    onClick={() => handleToggleComplete(currentLesson._id)}
                    style={{
                      background: completedLessons.includes(currentLesson._id) ? "var(--gr, #34d399)" : "var(--bg2)",
                      color: completedLessons.includes(currentLesson._id) ? "#fff" : "var(--tx)",
                      padding: "10px 18px",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      fontSize: "13px",
                      border: "1px solid var(--bd)",
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                  >
                    {completedLessons.includes(currentLesson._id) ? "✓ Completed" : "Mark Complete"}
                  </button>

                  <button
                    disabled={!hasNext}
                    onClick={handleNextLesson}
                    style={{
                      background: hasNext ? "linear-gradient(135deg, var(--ac, #7c6af7), #6254d8)" : "rgba(255,255,255,0.03)",
                      color: hasNext ? "#fff" : "var(--tx3)",
                      padding: "10px 22px",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      fontSize: "13px",
                      border: "none",
                      cursor: hasNext ? "pointer" : "not-allowed",
                      opacity: hasNext ? 1 : 0.4,
                      transition: "all 0.2s",
                      boxShadow: hasNext ? "0 4px 14px rgba(124,106,247,0.3)" : "none"
                    }}
                  >
                    Next Lesson →
                  </button>
                </div>
              </div>

              {currentLesson.content && (
                <div style={{ fontSize: "15px", color: "var(--tx2)", lineHeight: 1.7, background: "var(--bg2)", border: "1px solid var(--bd)", borderRadius: "12px", padding: "20px" }}>
                  <p style={{ whiteSpace: "pre-wrap" }}>{currentLesson.content}</p>
                </div>
              )}

              {currentLesson.resources?.length > 0 && (
                <div style={{ marginTop: "24px" }}>
                  <h4 style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "10px", color: "var(--tx)" }}>Resources & Attachments:</h4>
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    {currentLesson.resources.map((res: any, idx: number) => (
                      <a key={idx} href={res.url} target="_blank" rel="noreferrer" style={{ fontSize: "13px", padding: "8px 16px", background: "var(--bg2)", border: "1px solid var(--bd)", borderRadius: "8px", color: "var(--tx)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                        🔗 {res.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <p style={{ color: "var(--tx3)" }}>No lessons created for this course yet.</p>
        )}
      </div>

      {/* Right side: Syllabus Panel */}
      <div style={{ background: "var(--bg2)", padding: "24px", overflowY: "auto", borderLeft: "1px solid var(--bd)" }}>
        <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "16px", color: "var(--tx)" }}>Course Index</h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {modules.map((mod) => {
            const moduleLessons = lessons.filter((les) => les.moduleId === mod._id || les.moduleId?._id === mod._id);
            return (
              <div key={mod._id} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <h4 style={{ fontSize: "14px", fontWeight: "bold", color: "var(--tx2)", borderBottom: "1px solid var(--bd)", paddingBottom: "6px" }}>
                  {mod.title}
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {moduleLessons.map((les) => {
                    const isActive = currentLesson?._id === les._id;
                    const isDone = completedLessons.includes(les._id);
                    return (
                      <button
                        key={les._id}
                        onClick={() => setCurrentLesson(les)}
                        style={{
                          textAlign: "left",
                          padding: "10px 14px",
                          borderRadius: "8px",
                          border: "1px solid " + (isActive ? "var(--ac2)" : "transparent"),
                          background: isActive ? "rgba(124,106,247,0.15)" : "var(--bg)",
                          color: isActive ? "var(--ac2)" : "var(--tx)",
                          fontSize: "13px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          transition: "all 0.2s"
                        }}
                      >
                        <span style={{ fontWeight: isActive ? "bold" : "normal" }}>
                          {isDone ? "✅ " : "⚪ "} {les.title}
                        </span>
                        <span style={{ fontSize: "11px", color: "var(--tx3)" }}>
                          {les.duration}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .cworkspace-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
