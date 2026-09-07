"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import api from "@/lib/api";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Projects Catalog", href: "/projects" },
  { name: "Digital Store", href: "/products" },
  { name: "Courses & Academy", href: "/courses" },
  { name: "Articles & Blog", href: "/blog" },
  { name: "Services & Hire", href: "/services" },
];

const servicesList = [
  { name: "Full Stack Web Apps", href: "/services" },
  { name: "Frontend Architecture", href: "/services" },
  { name: "RESTful API & Microservices", href: "/services" },
  { name: "AI Agent & Workflow Integration", href: "/services" },
  { name: "Cloud & DevOps Deployment", href: "/services" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const [about, setAbout] = useState<any>({
    name: "Borhan Rabbani",
    title: "Full Stack Engineer & Solution Architect",
    bio: "Building high-performance web applications, scalable SaaS platforms, and AI-driven digital solutions with modern technology stacks.",
    social: {
      github: "https://github.com/rabbaniborhan",
      linkedin: "https://linkedin.com/in/rabbaniborhan",
      twitter: "https://twitter.com/rabbaniborhan",
      email: "brborhan70@gmail.com",
    },
  });

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await api.get("/about");
        if (res.data.success && res.data.data) {
          setAbout(res.data.data);
        }
      } catch (err) {
        console.error("Error loading footer data:", err);
      }
    };
    fetchAbout();
  }, []);

  const socials = [
    ...(about.social?.github ? [{ label: "GitHub", href: about.social.github, icon: "💻" }] : []),
    ...(about.social?.linkedin ? [{ label: "LinkedIn", href: about.social.linkedin, icon: "🔗" }] : []),
    ...(about.social?.twitter ? [{ label: "Twitter / X", href: about.social.twitter, icon: "𝕏" }] : []),
  ];

  const firstName = about.name?.split(" ")[0] || "Borhan";

  return (
    <footer style={{ background: "var(--bg2)", borderTop: "1px solid var(--bd)", position: "relative", zIndex: 10, overflow: "hidden" }}>
      {/* Top Gradient Highlight Line */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, var(--ac), #6366f1, transparent)" }} />

      {/* Ambient Glow Backdrop */}
      <div style={{ position: "absolute", top: "-50px", left: "50%", transform: "translateX(-50%)", width: "600px", height: "150px", background: "radial-gradient(ellipse at center, rgba(0, 184, 219, 0.08), transparent 70%)", pointerEvents: "none", filter: "blur(40px)" }} />

      <div className="container" style={{ padding: "64px 20px 32px", position: "relative", zIndex: 2 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "48px", marginBottom: "52px" }} className="ftg">
          
          {/* Brand & Bio Column */}
          <div style={{ maxWidth: "340px" }}>
            <Link href="/" style={{ textDecoration: "none" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, fontSize: "22px", color: "var(--tx)", marginBottom: "14px" }}>
                {firstName}<span style={{ color: "var(--ac)" }}>.dev</span>
              </div>
            </Link>

            <p style={{ fontSize: "13.5px", color: "var(--tx3)", lineHeight: 1.8, marginBottom: "20px" }}>
              {about.bio || about.title}
            </p>

            {/* Social Links */}
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: "7px 14px",
                    borderRadius: "10px",
                    border: "1px solid var(--bd)",
                    background: "var(--sf)",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "var(--tx2)",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "all 0.2s ease"
                  }}
                  className="soc-pill"
                >
                  <span>{s.icon}</span> {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <div style={{ fontSize: "12px", fontWeight: 800, color: "var(--tx)", marginBottom: "20px", letterSpacing: ".1em", textTransform: "uppercase" }}>
              Quick Navigation
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "11px" }}>
              {quickLinks.map((l) => (
                <li key={l.name}>
                  <Link
                    href={l.href}
                    style={{
                      fontSize: "13.5px",
                      color: "var(--tx3)",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      transition: "all 0.2s ease"
                    }}
                    className="ft-link"
                  >
                    <span style={{ color: "var(--ac)", fontSize: "14px" }}>›</span> {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services & Offerings Column */}
          <div>
            <div style={{ fontSize: "12px", fontWeight: 800, color: "var(--tx)", marginBottom: "20px", letterSpacing: ".1em", textTransform: "uppercase" }}>
              Services &amp; Offerings
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "11px" }}>
              {servicesList.map((s) => (
                <li key={s.name}>
                  <Link
                    href={s.href}
                    style={{
                      fontSize: "13.5px",
                      color: "var(--tx3)",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      transition: "all 0.2s ease"
                    }}
                    className="ft-link"
                  >
                    <span style={{ color: "var(--ac2)", fontSize: "14px" }}>›</span> {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact & Status Pill Column */}
          <div>
            <div style={{ fontSize: "12px", fontWeight: 800, color: "var(--tx)", marginBottom: "20px", letterSpacing: ".1em", textTransform: "uppercase" }}>
              Direct Contact
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "20px" }}>
              <a
                href="https://wa.me/8801704267876"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "13.5px", color: "var(--tx2)", textDecoration: "none" }}
              >
                <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(37, 211, 102, 0.12)", color: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", flexShrink: 0 }}>
                  💬
                </div>
                <span>+880 1704-267876 (WhatsApp)</span>
              </a>

              <a
                href={`mailto:${about.social?.email || "brborhan70@gmail.com"}`}
                style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "13.5px", color: "var(--tx2)", textDecoration: "none" }}
              >
                <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(0, 184, 219, 0.12)", color: "var(--ac2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", flexShrink: 0 }}>
                  📧
                </div>
                <span>{about.social?.email || "brborhan70@gmail.com"}</span>
              </a>

              <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "13.5px", color: "var(--tx3)" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(167, 139, 250, 0.12)", color: "#a78bfa", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", flexShrink: 0 }}>
                  📍
                </div>
                <span>Rajshahi, Bangladesh</span>
              </div>
            </div>

            {/* Live Availability Status Pill */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "20px",
                background: "rgba(34, 197, 94, 0.12)",
                border: "1px solid rgba(34, 197, 94, 0.3)",
                color: "#22c55e",
                fontSize: "12px",
                fontWeight: "700"
              }}
            >
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 10px #22c55e", display: "inline-block" }} />
              Available for New Projects
            </div>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div
          style={{
            borderTop: "1px solid var(--bd)",
            paddingTop: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px"
          }}
        >
          <span style={{ fontSize: "13px", color: "var(--tx3)" }}>
            © {year} <strong>{about.name}</strong>. Built with Next.js, Node.js &amp; ❤️
          </span>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
              fontSize: "12px",
              fontWeight: "bold",
              color: "var(--tx2)",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "var(--sf)",
              border: "1px solid var(--bd)",
              padding: "7px 16px",
              borderRadius: "10px",
              transition: "all 0.2s ease"
            }}
            className="ftbk"
          >
            ↑ Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
