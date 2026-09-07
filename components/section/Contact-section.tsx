"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchAbout } from "@/redux/slices/aboutSlice";

const packages = [
  { value: "hourly", label: "Hourly Support — $25 / hour" },
  { value: "fullstack", label: "Full Stack Project — $500 / project" },
  { value: "ai", label: "AI Integration — $800 / project" },
  { value: "custom", label: "Custom requirement" },
];

export function ContactSection() {
  const dispatch = useAppDispatch();
  const { about } = useAppSelector((state) => state.about);

  const [formData, setFormData] = useState({ name: "", email: "", subject: "", pkg: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [contactInfo, setContactInfo] = useState([
    { icon: "📞", label: "Phone / WhatsApp", value: "+880 1704-267876" },
    { icon: "📧", label: "Email", value: "brborhan70@gmail.com" },
    { icon: "📍", label: "Location", value: "Rajshahi, Bangladesh" },
    { icon: "🟢", label: "Availability", value: "Available 24/7 · Open to work", green: true },
  ]);

  useEffect(() => {
    dispatch(fetchAbout());
  }, [dispatch]);

  useEffect(() => {
    if (about) {
      setContactInfo([
        { icon: "📞", label: "Phone / WhatsApp", value: "+880 1704-267876" },
        { icon: "📧", label: "Email", value: about.social?.email || "brborhan70@gmail.com" },
        { icon: "📍", label: "Location", value: "Rajshahi, Bangladesh" },
        { icon: "🟢", label: "Availability", value: "Available 24/7 · Open to work", green: true },
      ]);
    }
  }, [about]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("vis"); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".rv, .rvl, .rvr").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await api.post("/contact", {
        name: formData.name,
        email: formData.email,
        subject: formData.subject || "General Inquiry",
        message: `${formData.pkg ? `[Package: ${formData.pkg}] ` : ""}${formData.message}`,
      });
      if (res.data.success) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setFormData({ name: "", email: "", subject: "", pkg: "", message: "" });
        }, 4000);
      }
    } catch (err: any) {
      console.error("Contact submit error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="sp"
      style={{
        background: "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(0, 184, 219, 0.08), transparent 80%), linear-gradient(180deg, var(--bg2) 0%, var(--bg) 100%)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Ambient Backdrop Orbs */}
      <div style={{ position: "absolute", top: "15%", left: "5%", width: "320px", height: "320px", background: "radial-gradient(circle, rgba(0,184,219,0.08) 0%, transparent 70%)", pointerEvents: "none", filter: "blur(40px)" }} />
      <div style={{ position: "absolute", bottom: "10%", right: "5%", width: "350px", height: "350px", background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)", pointerEvents: "none", filter: "blur(40px)" }} />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="sh">
          <div className="lbl" style={{ justifyContent: "center" }}>Get In Touch</div>
          <h2 className="stitle rv">Let&apos;s Work Together</h2>
        </div>

        <div className="cg">
          {/* Left: contact info */}
          <div className="rvl">
            <div className="cinfo">
              {contactInfo.map((c) => (
                <div key={c.label} className="cit">
                  <div className="cii">{c.icon}</div>
                  <div>
                    <div className="cil">{c.label}</div>
                    <div className="civ" style={c.green ? { color: "var(--gr)" } : {}}>
                      {c.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/8801704267876"
              target="_blank"
              rel="noopener noreferrer"
              className="wab"
              style={{ display: "inline-flex", marginTop: "8px" }}
            >
              💬 Chat Directly on WhatsApp
            </a>

            {/* Quick response note */}
            <div style={{
              marginTop: "24px", padding: "16px 20px",
              background: "rgba(0,184,219,.06)", border: "1px solid rgba(0,184,219,.15)",
              borderRadius: "var(--r)", display: "flex", alignItems: "flex-start", gap: "12px"
            }}>
              <span style={{ fontSize: "20px", flexShrink: 0 }}>⚡</span>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--tx)", marginBottom: "4px" }}>
                  Quick Response Guaranteed
                </div>
                <div style={{ fontSize: "12px", color: "var(--tx3)", lineHeight: 1.65 }}>
                  I typically respond within 2–4 hours during business hours. For urgent projects, WhatsApp is the fastest way to reach me.
                </div>
              </div>
            </div>
          </div>


          {/* Right: form */}
          <div className="rvr">
            {submitted ? (
              <div style={{ textAlign: "center", padding: "60px 20px" }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>✅</div>
                <h3 style={{ fontSize: "20px", fontWeight: 700, color: "var(--tx)", marginBottom: "8px" }}>
                  Message Sent!
                </h3>
                <p style={{ color: "var(--tx2)" }}>
                  Thank you for reaching out. I&apos;ll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="cf">
                <div className="frow">
                  <div className="fg">
                    <label className="flbl">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      className="fi"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="fg">
                    <label className="flbl">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="fi"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="fg">
                  <label className="flbl">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    className="fi"
                    placeholder="Project inquiry..."
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>

                <div className="fg">
                  <label className="flbl">Package Interest</label>
                  <select
                    name="pkg"
                    className="fi fsel"
                    value={formData.pkg}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select a package...</option>
                    {packages.map((p) => (
                      <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
                  </select>
                </div>

                <div className="fg">
                  <label className="flbl">Message</label>
                  <textarea
                    name="message"
                    className="fta"
                    placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className="fsub" disabled={submitting}>
                  {submitting ? "⏳ Sending..." : "🚀 Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
