"use client";

import { useState } from "react";
import api from "@/lib/api";

const services = [
  { value: "frontend", label: "Frontend Development" },
  { value: "fullstack", label: "Full Stack Application" },
  { value: "api", label: "REST API Development" },
  { value: "ai", label: "AI Integration" },
  { value: "devops", label: "DevOps & Deployment" },
  { value: "meta", label: "Meta Ads & CAPI" },
];

const packages = [
  { value: "hourly", label: "Hourly Support — $25 / hour" },
  { value: "fullstack", label: "Full Stack Project — $500" },
  { value: "ai", label: "AI Automation — $800" },
  { value: "custom", label: "Custom requirement" },
];

export default function HirePage() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", company: "", service: "", pkg: "", budget: "", message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const selectedService = services.find((s) => s.value === formData.service)?.label || formData.service;
      const selectedPkg = packages.find((p) => p.value === formData.pkg)?.label || formData.pkg;

      const subjectText = `Hire Me Request: ${selectedService || "New Project"}`;
      const messageBody = [
        `[Service: ${selectedService}]`,
        `[Package: ${selectedPkg}]`,
        formData.phone ? `[Phone/WhatsApp: ${formData.phone}]` : "",
        formData.company ? `[Company: ${formData.company}]` : "",
        formData.budget ? `[Budget: ${formData.budget}]` : "",
        `\nProject Description:\n${formData.message}`,
      ].filter(Boolean).join(" ");

      const res = await api.post("/contact", {
        name: formData.name,
        email: formData.email,
        subject: subjectText,
        message: messageBody,
      });

      if (res.data.success) {
        setSubmitted(true);
      }
    } catch (err: any) {
      console.error("Hire request submission error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ paddingTop: "64px" }}>
      <section className="sp">
        <div className="container" style={{ maxWidth: "900px" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div className="lbl" style={{ justifyContent: "center" }}>Let&apos;s Collaborate</div>
            <h1 className="stitle">Hire Me</h1>
            <p className="sdesc" style={{ maxWidth: "560px", margin: "0 auto" }}>
              Ready to bring your project to life? Fill in your project details and I&apos;ll get back to you within 24 hours.
            </p>
          </div>

          {/* Availability badge */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "48px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              background: "var(--bg2)", border: "1px solid var(--bd)", borderRadius: "50px",
              padding: "12px 24px"
            }}>
              <div style={{ width: "9px", height: "9px", borderRadius: "50%", background: "var(--gr)", boxShadow: "0 0 8px var(--gr)" }} />
              <span style={{ fontSize: "14px", color: "var(--tx2)" }}>Currently available for new projects</span>
            </div>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} style={{ background: "var(--bg2)", border: "1px solid var(--bd)", borderRadius: "var(--rl)", padding: "48px", display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* Row 1 */}
              <div className="frow">
                <div className="fg">
                  <label className="flbl">Full Name *</label>
                  <input name="name" type="text" className="fi" placeholder="John Doe" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="fg">
                  <label className="flbl">Email *</label>
                  <input name="email" type="email" className="fi" placeholder="john@company.com" value={formData.email} onChange={handleChange} required />
                </div>
              </div>

              {/* Row 2 */}
              <div className="frow">
                <div className="fg">
                  <label className="flbl">Phone / WhatsApp</label>
                  <input name="phone" type="tel" className="fi" placeholder="+1 234 567 8900" value={formData.phone} onChange={handleChange} />
                </div>
                <div className="fg">
                  <label className="flbl">Company</label>
                  <input name="company" type="text" className="fi" placeholder="Acme Corp (optional)" value={formData.company} onChange={handleChange} />
                </div>
              </div>

              {/* Row 3 */}
              <div className="frow">
                <div className="fg">
                  <label className="flbl">Service Needed *</label>
                  <select name="service" className="fi fsel" value={formData.service} onChange={handleChange} required>
                    <option value="" disabled>Select a service...</option>
                    {services.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                </div>
                <div className="fg">
                  <label className="flbl">Package *</label>
                  <select name="pkg" className="fi fsel" value={formData.pkg} onChange={handleChange} required>
                    <option value="" disabled>Select a package...</option>
                    {packages.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
                  </select>
                </div>
              </div>

              {/* Budget */}
              <div className="fg">
                <label className="flbl">Estimated Budget</label>
                <input name="budget" type="text" className="fi" placeholder="e.g. $500 — $1000" value={formData.budget} onChange={handleChange} />
              </div>

              {/* Message */}
              <div className="fg">
                <label className="flbl">Project Description *</label>
                <textarea
                  name="message" className="fta"
                  placeholder="Describe your project — what are you building, what features do you need, what's your timeline?"
                  value={formData.message} onChange={handleChange} required
                  style={{ minHeight: "160px" }}
                />
              </div>

              <button type="submit" className="fsub" disabled={submitting}>
                {submitting ? "⏳ Submitting..." : "🚀 Submit Project Request"}
              </button>

              <p style={{ fontSize: "12px", color: "var(--tx3)", textAlign: "center" }}>
                I respond to all inquiries within 24 hours. You can also reach me directly on{" "}
                <a href="https://wa.me/8801704267876" style={{ color: "var(--gr)" }}>WhatsApp</a>.
              </p>
            </form>
          ) : (
            <div style={{ textAlign: "center", padding: "80px 20px", background: "var(--bg2)", border: "1px solid var(--bd)", borderRadius: "var(--rl)" }}>
              <div style={{ fontSize: "56px", marginBottom: "20px" }}>🎉</div>
              <h2 style={{ fontSize: "26px", fontWeight: 700, color: "var(--tx)", marginBottom: "12px" }}>Request Received!</h2>
              <p style={{ color: "var(--tx2)", maxWidth: "440px", margin: "0 auto 24px" }}>
                Thank you for reaching out! I&apos;ll review your project details and get back to you within 24 hours.
              </p>
              <a href="https://wa.me/8801704267876" className="wab" style={{ display: "inline-flex" }}>
                💬 Chat Directly on WhatsApp
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
