"use client";

import { useEffect, useState } from "react";

const STATIC_TESTIMONIALS = [
  {
    stars: "★★★★★",
    text: "Borhan delivered our e-commerce platform in record time. Clean code, great communication, zero bugs at launch. Highly recommend!",
    initials: "AK",
    name: "Ahmed Karim",
    location: "Dubai, UAE",
    gradient: "linear-gradient(135deg,var(--ac),#0070a0)",
  },
  {
    stars: "★★★★★",
    text: "Built a full MERN stack app for our startup. The quality of code and attention to detail exceeded expectations. Will hire again!",
    initials: "SM",
    name: "Sarah Mitchell",
    location: "London, UK",
    gradient: "linear-gradient(135deg,#06b6d4,#3b82f6)",
  },
  {
    stars: "★★★★★",
    text: "Integrated OpenAI into our customer support system. Response times dropped 80%. Borhan knows his AI stuff inside out.",
    initials: "RC",
    name: "Rafael Costa",
    location: "São Paulo, Brazil",
    gradient: "linear-gradient(135deg,#10b981,#059669)",
  },
];

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchTestimonials } from "@/redux/slices/testimonialSlice";

export function TestimonialsSection() {
  const dispatch = useAppDispatch();
  const { testimonials: apiTestimonials } = useAppSelector((state) => state.testimonials);
  const [testimonials, setTestimonials] = useState<any[]>(STATIC_TESTIMONIALS);

  useEffect(() => {
    dispatch(fetchTestimonials());
  }, [dispatch]);

  useEffect(() => {
    if (apiTestimonials && apiTestimonials.length > 0) {
      const mapped = apiTestimonials.map((t: any, idx: number) => {
        const gradients = [
          "linear-gradient(135deg,var(--ac),#0070a0)",
          "linear-gradient(135deg,#06b6d4,#3b82f6)",
          "linear-gradient(135deg,#10b981,#059669)"
        ];
        let avatarUrl = t.avatar || t.image;
        if (avatarUrl) {
          avatarUrl = avatarUrl.trim();
          if (avatarUrl.startsWith("/uploads/") || avatarUrl.startsWith("uploads/")) {
            const host = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "http://localhost:5000";
            avatarUrl = avatarUrl.startsWith("/") ? `${host}${avatarUrl}` : `${host}/${avatarUrl}`;
          }
        }
        return {
          stars: "★".repeat(t.rating || 5) + "☆".repeat(Math.max(0, 5 - (t.rating || 5))),
          text: t.content || t.message || t.text,
          initials: t.name ? t.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2) : "CL",
          avatarUrl: avatarUrl && (avatarUrl.startsWith("http") || avatarUrl.startsWith("data:") || avatarUrl.startsWith("/")) ? avatarUrl : null,
          name: t.name,
          location: t.role || t.position || t.company || "Client",
          gradient: gradients[idx % gradients.length],
        };
      });
      setTestimonials(mapped);
    }
  }, [apiTestimonials]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("vis"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".rv, .rvl, .rvr").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [testimonials]);

  // Double the testimonials array to make an endless marquee loop if there are entries
  const listToRender = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section
      id="testimonials"
      className="sp"
      style={{
        background: "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(0, 184, 219, 0.08), transparent 80%), linear-gradient(180deg, var(--bg) 0%, var(--bg2) 50%, var(--bg) 100%)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Ambient Backdrop Orbs */}
      <div style={{ position: "absolute", top: "20%", left: "10%", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(0,184,219,0.07) 0%, transparent 70%)", pointerEvents: "none", filter: "blur(40px)" }} />
      <div style={{ position: "absolute", bottom: "20%", right: "10%", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)", pointerEvents: "none", filter: "blur(40px)" }} />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="sh">
          <div className="lbl" style={{ justifyContent: "center" }}>What Clients Say</div>
          <h2 className="stitle rv">Client Testimonials</h2>
        </div>
      </div>

      {/* Infinite loop marquee container */}
      <div className="test-carousel-wrapper rv">
        <div className="test-carousel-track">
          <div className="test-carousel-group">
            {listToRender.map((t, idx) => (
              <div key={idx} className="testc testc-card">
                <div className="testq">&ldquo;</div>
                <div className="tsts">{t.stars}</div>
                <p className="testt">{t.text}</p>
                <div className="testa">
                  <div className="testav" style={{ background: t.gradient, overflow: "hidden" }}>
                    {t.avatarUrl ? (
                      <img src={t.avatarUrl} alt={t.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      t.initials
                    )}
                  </div>
                  <div>
                    <div className="testn">{t.name}</div>
                    <div className="testl">{t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Styled Local Styles for Testimonial Carousel */}
      <style>{`
        .test-carousel-wrapper {
          overflow: hidden;
          width: 100%;
          padding: 40px 0;
          position: relative;
          margin-top: 20px;
        }
        .test-carousel-wrapper::before,
        .test-carousel-wrapper::after {
          content: "";
          height: 100%;
          position: absolute;
          top: 0;
          width: 180px;
          z-index: 2;
          pointer-events: none;
        }
        .test-carousel-wrapper::before {
          left: 0;
          background: linear-gradient(to right, var(--bg) 0%, transparent 100%);
        }
        .test-carousel-wrapper::after {
          right: 0;
          background: linear-gradient(to left, var(--bg) 0%, transparent 100%);
        }
        .test-carousel-track {
          display: flex;
          width: max-content;
        }
        .test-carousel-group {
          display: flex;
          gap: 24px;
          animation: marquee 45s linear infinite;
        }
        .test-carousel-group:hover {
          animation-play-state: paused;
        }
        .testc-card {
          width: 380px;
          flex-shrink: 0;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
      `}</style>
    </section>
  );
}
