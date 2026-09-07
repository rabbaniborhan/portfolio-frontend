"use client";

import { useEffect } from "react";

export function CTASection() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("vis"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".rv, .rvl, .rvr").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="cta" className="sp" style={{ padding: "40px 0" }}>
      <div className="container" style={{ maxWidth: "880px" }}>
        <div
          className="rv"
          style={{
            background: "linear-gradient(135deg, var(--bg2), rgba(0, 184, 219, 0.05))",
            border: "1px solid var(--bd)",
            borderRadius: "20px",
            padding: "36px 32px",
            textAlign: "center",
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            position: "relative",
            overflow: "hidden"
          }}
        >
          {/* Subtle Accent Glow Line */}
          <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "160px", height: "2px", background: "linear-gradient(90deg, transparent, var(--ac), transparent)" }} />

          {/* Heading */}
          <h2 style={{ fontSize: "clamp(22px, 2.5vw, 32px)", fontWeight: 700, color: "var(--tx)", marginBottom: "10px" }}>
            Have a Project in Mind? Let&apos;s Build It Together 🚀
          </h2>

          <p style={{ fontSize: "14px", color: "var(--tx2)", marginBottom: "24px", maxWidth: "560px", margin: "0 auto 24px" }}>
            Available for full-stack web applications, custom API development, and AI integrations.
          </p>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
            <a
              href="#contact"
              onClick={scrollToContact}
              style={{
                padding: "10px 24px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, var(--ac), #6366f1)",
                color: "#ffffff",
                fontWeight: "bold",
                fontSize: "13px",
                textDecoration: "none",
                boxShadow: "0 4px 14px rgba(0,184,219,0.3)",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                cursor: "pointer"
              }}
            >
              🚀 Send Message
            </a>

            <a
              href="https://wa.me/8801704267876"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "10px 22px",
                borderRadius: "10px",
                background: "rgba(34,197,94,0.12)",
                color: "#22c55e",
                border: "1px solid rgba(34,197,94,0.3)",
                fontWeight: "bold",
                fontSize: "13px",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                cursor: "pointer"
              }}
            >
              💬 WhatsApp Chat
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
