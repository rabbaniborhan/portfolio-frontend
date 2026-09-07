"use client";

import { useEffect, useRef, useState } from "react";
import api from "@/lib/api";

const stats = [
  { target: 3,  suffix: "+", label: "Years Experience" },
  { target: 30, suffix: "+", label: "Projects Delivered" },
  { target: 5,  suffix: "+", label: "Companies Worked" },
  { target: 20, suffix: "+", label: "Happy Clients" },
];

const roles = [
  "Full Stack Engineer",
  "MERN Stack Developer",
  "React & Next.js Expert",
  "Node.js Architect",
  "AI-Driven Builder",
];

export function HeroSection() {
  const statsRef = useRef<HTMLDivElement>(null);
  const animated = useRef(false);
  const [about, setAbout] = useState<any>({
    name: "Borhan Rabbani",
    title: "Full Stack Engineer",
    bio: "Full Stack Engineer with 3+ years of experience in React, Next.js, Node.js, and AI-driven innovation. I build scalable digital products that make a real impact.",
    social: { github: "", linkedin: "", twitter: "", email: "" },
  });
  const [skills, setSkills] = useState<any[]>([]);
  const [typedRole, setTypedRole] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch about data
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await api.get("/about");
        if (res.data.success && res.data.data) {
          setAbout(res.data.data);
        }
      } catch (err) {
        console.error("Error loading Hero section data:", err);
      }
    };
    fetchAbout();
  }, []);

  // Fetch skills for tech pills
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await api.get("/skills");
        if (res.data.success && res.data.skills?.length > 0) {
          setSkills(res.data.skills.slice(0, 10));
        }
      } catch (err) {
        console.error("Error loading skills:", err);
      }
    };
    fetchSkills();
  }, []);

  // Typing animation
  useEffect(() => {
    const currentRole = roles[roleIndex];
    const speed = isDeleting ? 35 : 70;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setTypedRole(currentRole.substring(0, charIndex + 1));
        if (charIndex + 1 === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 1800);
          return;
        }
        setCharIndex(charIndex + 1);
      } else {
        setTypedRole(currentRole.substring(0, charIndex - 1));
        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setRoleIndex((roleIndex + 1) % roles.length);
          setCharIndex(0);
          return;
        }
        setCharIndex(charIndex - 1);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, roleIndex]);

  // Reveal on scroll
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

  // Animate counters
  useEffect(() => {
    const startCounting = () => {
      if (animated.current) return;
      animated.current = true;
      document.querySelectorAll(".sn[data-target]").forEach((el) => {
        const target = parseInt(el.getAttribute("data-target") || "0");
        const suffix = el.getAttribute("data-suffix") || "";
        let current = 0;
        const duration = 1600; // 1.6s counting duration
        const steps = 40;
        const stepTime = duration / steps;
        const increment = target / steps;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = Math.floor(current) + suffix;
        }, stepTime);
      });
    };

    const counterObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startCounting();
        }
      },
      { threshold: 0.1 }
    );

    if (statsRef.current) counterObserver.observe(statsRef.current);
    const fallbackTimer = setTimeout(startCounting, 400);

    return () => {
      counterObserver.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      style={{
        background: "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(0, 184, 219, 0.12), transparent 80%), linear-gradient(180deg, var(--bg) 0%, var(--bg2) 100%)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Ambient Backdrop Orbs */}
      <div style={{ position: "absolute", top: "10%", left: "15%", width: "350px", height: "350px", background: "radial-gradient(circle, rgba(0,184,219,0.09) 0%, transparent 70%)", pointerEvents: "none", filter: "blur(50px)" }} />
      <div style={{ position: "absolute", top: "40%", right: "10%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(99,102,241,0.09) 0%, transparent 70%)", pointerEvents: "none", filter: "blur(50px)" }} />

      {/* Floating particles */}
      <div className="hero-particles" aria-hidden="true">
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${6 + Math.random() * 8}s`,
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            opacity: 0.15 + Math.random() * 0.25,
          }} />
        ))}
      </div>

      <div className="container">
        <div className="hg">
          {/* Left column */}
          <div>
            <div className="hey rv">
              <div className="dg" />
              Available for new projects
            </div>

            <p style={{ fontSize: "17px", color: "var(--tx2)", marginBottom: "6px" }} className="rv">
              Hi, I&apos;m
            </p>

            <h1 className="hname rv">
              <span className="hero-name-gradient">
                {about.name}
              </span>{" "}
              <span style={{ WebkitTextFillColor: "initial" }}>👋</span>
            </h1>

            <div className="hero-typing rv">
              <span className="typing-text">{typedRole}</span>
              <span className="typing-cursor" />
            </div>

            <p className="hdesc rv">
              {about.bio}
            </p>

            {/* Dynamic tech pills from Skills API */}
            <div className="pills rv">
              {skills.length > 0
                ? skills.map((s) => (
                    <span key={s._id} className="pill">
                      <span className="pd" style={{ background: "var(--ac)" }} />
                      {s.icon ? `${s.icon} ` : ""}{s.name}
                    </span>
                  ))
                : ["⚛️ React", "▲ Next.js", "🟨 JavaScript", "🔷 TypeScript", "🟢 Node.js", "🗄️ MongoDB", "☁️ AWS", "🐋 Docker"].map((label) => (
                    <span key={label} className="pill">
                      <span className="pd" style={{ background: "var(--ac)" }} />
                      {label}
                    </span>
                  ))
              }
            </div>

            <div className="hbtns rv">
              <a
                href="#contact"
                className="bp"
                onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}
              >
                ⚡ Hire Me
              </a>
              <a href={about.resume || "/cv"} className="bs" target="_blank" rel="noopener noreferrer">📄 Download CV</a>
            </div>
          </div>

          {/* Right column – 3D VS Code editor */}
          <div className="hr rvr">
            <div className="code-editor">
              {/* Editor glow accent */}
              <div className="ce-glow" />

              {/* Title bar */}
              <div className="ce-titlebar">
                <div className="ce-dots">
                  <span className="ce-dot ce-dot-r" />
                  <span className="ce-dot ce-dot-y" />
                  <span className="ce-dot ce-dot-g" />
                </div>
                <div className="ce-title">developer.ts — {about.name?.split(" ")[0] || "Borhan"}</div>
                <div className="ce-actions">
                  <span>⌘</span>
                </div>
              </div>

              {/* Tab bar */}
              <div className="ce-tabs">
                <div className="ce-tab ce-tab-active">
                  <span className="ce-tab-icon">TS</span>
                  developer.ts
                </div>
                <div className="ce-tab">
                  <span className="ce-tab-icon ce-tab-icon-json">{"{}"}</span>
                  config.json
                </div>
                <div className="ce-tab">
                  <span className="ce-tab-icon ce-tab-icon-css">#</span>
                  styles.css
                </div>
              </div>

              {/* Code body */}
              <div className="ce-body">
                <div className="ce-line">
                  <span className="ce-ln">1</span>
                  <span className="ce-kw">interface</span> <span className="ce-type">Developer</span> {"{"}
                </div>
                <div className="ce-line">
                  <span className="ce-ln">2</span>
                  {"  "}<span className="ce-prop">name</span><span className="ce-punc">:</span> <span className="ce-type">string</span><span className="ce-punc">;</span>
                </div>
                <div className="ce-line">
                  <span className="ce-ln">3</span>
                  {"  "}<span className="ce-prop">role</span><span className="ce-punc">:</span> <span className="ce-type">string</span><span className="ce-punc">;</span>
                </div>
                <div className="ce-line">
                  <span className="ce-ln">4</span>
                  {"  "}<span className="ce-prop">available</span><span className="ce-punc">:</span> <span className="ce-type">boolean</span><span className="ce-punc">;</span>
                </div>
                <div className="ce-line">
                  <span className="ce-ln">5</span>
                  {"  "}<span className="ce-prop">skills</span><span className="ce-punc">:</span> <span className="ce-type">string[]</span><span className="ce-punc">;</span>
                </div>
                <div className="ce-line">
                  <span className="ce-ln">6</span>
                  {"}"}
                </div>
                <div className="ce-line ce-line-empty">
                  <span className="ce-ln">7</span>
                </div>
                <div className="ce-line">
                  <span className="ce-ln">8</span>
                  <span className="ce-kw">const</span> <span className="ce-var">me</span><span className="ce-punc">:</span> <span className="ce-type">Developer</span> <span className="ce-punc">=</span> {"{"}
                </div>
                <div className="ce-line ce-line-highlight">
                  <span className="ce-ln">9</span>
                  {"  "}<span className="ce-prop">name</span><span className="ce-punc">:</span> <span className="ce-str">&quot;{about.name}&quot;</span><span className="ce-punc">,</span>
                </div>
                <div className="ce-line ce-line-highlight">
                  <span className="ce-ln">10</span>
                  {"  "}<span className="ce-prop">role</span><span className="ce-punc">:</span> <span className="ce-str">&quot;{about.title}&quot;</span><span className="ce-punc">,</span>
                </div>
                <div className="ce-line">
                  <span className="ce-ln">11</span>
                  {"  "}<span className="ce-prop">available</span><span className="ce-punc">:</span> <span className="ce-bool">true</span><span className="ce-punc">,</span>
                </div>
                <div className="ce-line">
                  <span className="ce-ln">12</span>
                  {"  "}<span className="ce-prop">skills</span><span className="ce-punc">:</span> [
                </div>
                <div className="ce-line">
                  <span className="ce-ln">13</span>
                  {"    "}<span className="ce-str">&quot;React&quot;</span><span className="ce-punc">,</span> <span className="ce-str">&quot;Next.js&quot;</span><span className="ce-punc">,</span> <span className="ce-str">&quot;Node.js&quot;</span><span className="ce-punc">,</span>
                </div>
                <div className="ce-line">
                  <span className="ce-ln">14</span>
                  {"    "}<span className="ce-str">&quot;TypeScript&quot;</span><span className="ce-punc">,</span> <span className="ce-str">&quot;MongoDB&quot;</span>
                </div>
                <div className="ce-line">
                  <span className="ce-ln">15</span>
                  {"  "}]<span className="ce-punc">,</span>
                </div>
                <div className="ce-line">
                  <span className="ce-ln">16</span>
                  {"}"}<span className="ce-punc">;</span>
                </div>
                <div className="ce-line ce-line-empty">
                  <span className="ce-ln">17</span>
                </div>
                <div className="ce-line">
                  <span className="ce-ln">18</span>
                  <span className="ce-var">me</span><span className="ce-punc">.</span><span className="ce-fn">buildAmazingThings</span><span className="ce-punc">()</span><span className="ce-punc">;</span> <span className="ce-comment">// 🚀</span>
                </div>
                <div className="ce-line">
                  <span className="ce-ln">19</span>
                  <span className="ce-cursor-line" />
                </div>
              </div>

              {/* Status bar */}
              <div className="ce-statusbar">
                <div className="ce-sb-left">
                  <span className="ce-sb-branch">⎇ main</span>
                  <span className="ce-sb-item">TypeScript</span>
                </div>
                <div className="ce-sb-right">
                  <span className="ce-sb-item">Ln 19, Col 1</span>
                  <span className="ce-sb-item">UTF-8</span>
                  <span className="ce-sb-item">Prettier</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar – full width */}
        <div className="hstats" ref={statsRef}>
          {stats.map((s) => (
            <div key={s.label} className="si">
              <span className="sn" data-target={s.target} data-suffix={s.suffix}>0</span>
              <div className="sl">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="sd">
        <div className="sr2">↓</div>
        <span>scroll</span>
      </div>
    </section>
  );
}
