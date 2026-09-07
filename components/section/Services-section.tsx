"use client";

import { useEffect } from "react";

const services = [
  {
    icon: "⚛️",
    name: "Frontend Development",
    desc: "Pixel-perfect UIs with React, Next.js, and modern CSS.",
  },
  {
    icon: "🔌",
    name: "REST API & Backend",
    desc: "Robust Node.js APIs with auth, rate limiting, and docs.",
  },
  {
    icon: "🗄️",
    name: "Full Stack Web Apps",
    desc: "End-to-end MERN applications from database to cloud.",
  },
  {
    icon: "🤖",
    name: "AI Integration & Agents",
    desc: "GPT-4, Claude integrations, chatbots, and automation.",
  },
  {
    icon: "🐋",
    name: "DevOps & Cloud Deployment",
    desc: "Docker containerization, CI/CD, AWS, and Vercel hosting.",
  },
];

export function ServicesSection() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("vis");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".rv, .rvl, .rvr").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      className="sp"
      style={{
        background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(99,102,241,0.08), transparent 80%), linear-gradient(180deg, var(--bg) 0%, var(--bg2) 50%, var(--bg) 100%)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Ambient Backdrop Orbs */}
      <div style={{ position: "absolute", top: "10%", right: "8%", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(0,184,219,0.07) 0%, transparent 70%)", pointerEvents: "none", filter: "blur(40px)" }} />
      <div style={{ position: "absolute", bottom: "10%", left: "8%", width: "320px", height: "320px", background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)", pointerEvents: "none", filter: "blur(40px)" }} />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="sh" style={{ textAlign: "center", marginBottom: "44px" }}>
          <div className="lbl" style={{ justifyContent: "center" }}>What I Do</div>
          <h2 className="stitle rv" style={{ fontSize: "clamp(26px, 3.5vw, 40px)" }}>Services &amp; Expertise</h2>
          <p className="sdesc rv" style={{ maxWidth: "600px", margin: "0 auto" }}>
            High-performance web solutions built with cutting-edge technologies and clean software architecture.
          </p>
        </div>

        <div className="svg">
          {services.map((s) => (
            <div key={s.name} className="svc rv">
              <div className="svci">{s.icon}</div>
              <div className="svcn">{s.name}</div>
              <div className="svcd">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
