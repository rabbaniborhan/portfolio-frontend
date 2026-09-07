"use client";

import Link from "next/link";
import { ContactSection } from "@/components/section/Contact-section";

const services = [
  {
    icon: "⚛️",
    name: "Frontend Development",
    slug: "frontend",
    desc: "Pixel-perfect, responsive UIs with React, Next.js, TypeScript, and modern CSS. Fast, accessible, and visually stunning web experiences.",
    features: ["React & Next.js", "TypeScript", "Tailwind CSS", "Performance optimization", "SEO-friendly", "Mobile-first design"],
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    from: "$300",
  },
  {
    icon: "🔌",
    name: "REST API Development",
    slug: "api",
    desc: "Robust Node.js & Express APIs with JWT auth, rate limiting, full documentation, and versioning. Production-ready from day one.",
    features: ["RESTful architecture", "JWT Authentication", "Rate limiting", "OpenAPI docs", "Version management", "Error handling"],
    tech: ["Node.js", "Express", "MongoDB", "PostgreSQL", "JWT"],
    from: "$400",
  },
  {
    icon: "🗄️",
    name: "Full Stack Applications",
    slug: "fullstack",
    desc: "End-to-end MERN applications — from database schema design to deployed production environment. Complete, scalable solutions.",
    features: ["MERN Stack", "Database design", "Admin dashboard", "Payment integration", "Cloud deployment", "Documentation"],
    tech: ["React", "Node.js", "MongoDB", "Express", "Docker", "AWS"],
    from: "$500",
  },
  {
    icon: "🤖",
    name: "AI Integration",
    slug: "ai",
    desc: "GPT-4 integrations, chatbots, AI-powered workflows, and automation pipelines. Bring intelligence to your business operations.",
    features: ["OpenAI GPT-4", "Custom AI workflows", "Chatbot development", "Data pipelines", "Lead qualification", "AI automation"],
    tech: ["OpenAI API", "LangChain", "Python", "Node.js", "Vector DBs"],
    from: "$600",
  },
  {
    icon: "🐋",
    name: "DevOps & Deployment",
    slug: "devops",
    desc: "Docker, CI/CD pipelines, AWS/Vercel deployment, Nginx configuration, and cloud infrastructure. Zero-downtime production setup.",
    features: ["Docker containerization", "CI/CD pipelines", "AWS/DigitalOcean", "Nginx configuration", "SSL certificates", "Monitoring"],
    tech: ["Docker", "GitHub Actions", "AWS", "Nginx", "Linux"],
    from: "$350",
  },
  {
    icon: "📊",
    name: "Meta Ads & CAPI",
    slug: "meta-ads",
    desc: "Server-side conversion tracking, Meta Pixel implementation, and CAPI integration. Maximise your advertising ROI with accurate data.",
    features: ["Meta Pixel setup", "CAPI integration", "Server-side tracking", "Conversion optimization", "A/B testing", "Analytics"],
    tech: ["Meta CAPI", "Facebook Pixel", "Google Analytics", "GTM"],
    from: "$250",
  },
];

export default function ServicesPage() {
  const handleGetStarted = (serviceName: string) => {
    const contactEl = document.getElementById("contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/contact?service=${encodeURIComponent(serviceName)}`;
    }
  };

  return (
    <div style={{ paddingTop: "64px" }}>
      {/* Hero */}
      <section className="sp" style={{ paddingBottom: "60px" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div className="lbl" style={{ justifyContent: "center" }}>What I Do</div>
            <h1 className="stitle">Services &amp; Expertise</h1>
            <p className="sdesc" style={{ maxWidth: "600px", margin: "0 auto" }}>
              From idea to production — I build complete, scalable digital solutions that drive real business results.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "20px" }}>
            {services.map((s) => (
              <div key={s.slug} className="svc-page-card">
                {/* Top gradient line */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg,var(--ac),var(--pk))" }} />

                <div style={{
                  width: "56px", height: "56px", borderRadius: "14px",
                  background: "rgba(124,106,247,.1)", border: "1px solid rgba(124,106,247,.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "26px", marginBottom: "20px"
                }}>
                  {s.icon}
                </div>

                <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "8px", color: "var(--tx)" }}>{s.name}</h2>
                <p style={{ fontSize: "14px", color: "var(--tx2)", lineHeight: 1.75, marginBottom: "24px" }}>{s.desc}</p>

                <div style={{ marginBottom: "24px" }}>
                  <div style={{ fontSize: "11px", color: "var(--tx3)", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: "12px", fontFamily: "'JetBrains Mono', monospace" }}>
                    Features
                  </div>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
                    {s.features.map((f) => (
                      <li key={f} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "var(--tx2)" }}>
                        <span style={{ color: "var(--gr)", flexShrink: 0 }}>✓</span>{f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "24px" }}>
                  {s.tech.map((t) => (
                    <span key={t} className="ttg">{t}</span>
                  ))}
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "13px", color: "var(--tx3)" }}>
                    Starting from <strong style={{ color: "var(--ac)", fontFamily: "'JetBrains Mono', monospace" }}>{s.from}</strong>
                  </span>
                  
                  <button
                    onClick={() => handleGetStarted(s.name)}
                    className="bp"
                    style={{ padding: "10px 20px", fontSize: "13px", cursor: "pointer", border: "none" }}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Embedded Contact Section */}
      <ContactSection />
    </div>
  );
}
